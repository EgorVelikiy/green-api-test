import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { createGreenApi } from "../api/greenApi";
import type { GreenApiNotification } from "../api/types";
import { useNotifications } from "./useNotifications";
import { createChatId, normalizePhone } from "../utils/phone";
import type { ChatMessage } from "../types/chat";

export const useChat = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [phone, setPhone] = useState("");

  const [connected, setConnected] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [connecting, setConnecting] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const greenApi = useMemo(() => {
    if (!idInstance || !apiToken) {
      return null;
    }

    return createGreenApi(idInstance, apiToken);
  }, [idInstance, apiToken]);

  const handleNotification = useCallback(
    (notification: GreenApiNotification) => {
      const { body } = notification;

      if (body.typeWebhook !== "incomingMessageReceived") {
        return;
      }

      if (body.messageData?.typeMessage !== "textMessage") {
        return;
      }

      const text = body.messageData.textMessageData?.textMessage;

      if (!text) {
        return;
      }

      const senderChatId = body.senderData?.chatId;

      if (!senderChatId) {
        return;
      }

      const currentChatId = createChatId(phone);

      if (senderChatId !== currentChatId) {
        return;
      }

      const incomingMessage: ChatMessage = {
        id: body.idMessage ?? String(notification.receiptId),
        text,
        direction: "incoming",
        timestamp: body.timestamp * 1000,
      };

      setMessages((current) => {
        if (
          current.some(
            (item) => item.id === incomingMessage.id,
          )
        ) {
          return current;
        }

        return [...current, incomingMessage];
      });
    },
    [phone],
  );

  useNotifications({
    greenApi,
    onNotification: handleNotification,
    enabled: connected,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleConnect = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (connecting) {
      return;
    }

    setError("");

    const normalizedPhone = normalizePhone(phone);

    if (!idInstance || !apiToken || !normalizedPhone) {
      setError("Заполните все поля");
      return;
    }

    if (
      normalizedPhone.length !== 11 ||
      !normalizedPhone.startsWith("7")
    ) {
      setError("Введите корректный номер телефона");
      return;
    }

    if (!greenApi) {
      return;
    }

    setConnecting(true);

    try {
      const state = await greenApi.getStateInstance();

      if (state !== "authorized") {
        setError(
          "WhatsApp не подключён к Green-API. Проверьте состояние instance.",
        );

        return;
      }

      setPhone(normalizedPhone);
      setMessages([]);
      setConnected(true);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Не удалось подключиться к Green-API",
      );
    } finally {
      setConnecting(false);
    }
  };

  const handleSend = async () => {
    const text = message.trim();

    if (!greenApi || !text || !phone || sending) {
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await greenApi.sendMessage({
        chatId: createChatId(phone),
        message: text,
      });

      const outgoingMessage: ChatMessage = {
        id: response.idMessage,
        text,
        direction: "outgoing",
        timestamp: Date.now(),
      };

      setMessages((current) => [
        ...current,
        outgoingMessage,
      ]);

      setMessage("");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Не удалось отправить сообщение",
      );
    } finally {
      setSending(false);
    }
  };

  const handleMessageKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  const handleCloseChat = () => {
    setConnected(false);
    setMessages([]);
    setMessage("");
    setError("");
  };

  return {
    auth: {
      idInstance,
      apiToken,
      phone,
      connecting,
      error,
      setIdInstance,
      setApiToken,
      setPhone,
      handleConnect,
    },

    chat: {
      phone,
      messages,
      message,
      sending,
      error,
      messagesEndRef,
      setMessage,
      handleSend,
      handleMessageKeyDown,
      handleCloseChat,
    },

    connected,
  };
};
