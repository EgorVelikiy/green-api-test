import { useEffect } from "react";
import type { GreenApiNotification } from "../api/types";

interface GreenApi {
  receiveNotification: () => Promise<GreenApiNotification | null>;
  deleteNotification: (receiptId: number) => Promise<void>;
}

interface UseNotificationsOptions {
  greenApi: GreenApi | null;
  onNotification: (notification: GreenApiNotification) => void;
  enabled?: boolean;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useNotifications = ({
  greenApi,
  onNotification,
  enabled = true,
}: UseNotificationsOptions) => {
  useEffect(() => {
    if (!greenApi || !enabled) {
      return;
    }

    let cancelled = false;

    const poll = async () => {
      while (!cancelled) {
        try {
          const notification = await greenApi.receiveNotification();

          console.log("Получено сообщение:", notification);

          if (cancelled) {
            return;
          }

          if (!notification) {
            await sleep(500);
            continue;
          }

          console.log(JSON.stringify(notification, null, 2));

          onNotification(notification);

          await greenApi.deleteNotification(notification.receiptId);
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error("Notification polling error:", error);

          await sleep(3000);
        }
      }
    };

    void poll();

    return () => {
      cancelled = true;
    };
  }, [greenApi, onNotification, enabled]);
};
