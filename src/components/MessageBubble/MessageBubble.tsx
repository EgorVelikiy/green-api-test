import type { ChatMessage } from "../../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isOutgoing = message.direction === "outgoing";

  return (
    <div
      className={`message-row ${
        isOutgoing
          ? "message-row-outgoing"
          : "message-row-incoming"
      }`}
    >
      <div
        className={`message ${
          isOutgoing
            ? "message-outgoing"
            : "message-incoming"
        }`}
      >
        <span>{message.text}</span>

        <time>
          {new Date(message.timestamp).toLocaleTimeString(
            "ru-RU",
            {
              hour: "2-digit",
              minute: "2-digit",
            },
          )}
        </time>
      </div>
    </div>
  );
}

export default MessageBubble;
