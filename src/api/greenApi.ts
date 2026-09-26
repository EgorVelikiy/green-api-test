import type {
  SendMessageRequest,
  SendMessageResponse,
  GreenApiNotification,
} from './types';

const API_URL = "https://api.greenapi.com";

export const createGreenApi = (
  idInstance: string,
  apiTokenInstance: string,
) => {
  const getUrl = (method: string) =>
    `${API_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`;

  const getStateInstance = async (): Promise<string> => {
    const response = await fetch(getUrl("getStateInstance"));

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.message || "Не удалось проверить состояние WhatsApp",
      );
    }

    return data?.stateInstance ?? "";
  };

  const sendMessage = async (
    data: SendMessageRequest,
  ): Promise<SendMessageResponse> => {
    const response = await fetch(getUrl("sendMessage"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);

      throw new Error(error?.message || "Не удалось отправить сообщение");
    }

    return response.json();
  };

  const receiveNotification = async (): Promise<GreenApiNotification  | null> => {
    const response = await fetch(getUrl("receiveNotification"));

    if (!response.ok) {
      throw new Error("Не удалось получить уведомление");
    }

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();

    if (!data) {
      return null;
    }

    return data;
  };

  const deleteNotification = async (receiptId: number): Promise<void> => {
    const response = await fetch(
      `${getUrl("deleteNotification")}/${receiptId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Не удалось удалить уведомление");
    }
  };

  return {
    sendMessage,
    receiveNotification,
    deleteNotification,
    getStateInstance,
  };
};
