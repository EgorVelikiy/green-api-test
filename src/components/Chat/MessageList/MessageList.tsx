import type { RefObject } from "react";
import type { ChatMessage } from "../../../types/chat";
import MessageBubble from "../../MessageBubble/MessageBubble";


interface MessageListProps {
  messages: ChatMessage[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

function MessageList({
  messages,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="messages">
      {messages.length === 0 ? (
        <div className="empty-chat">
          <h2>Начните диалог</h2>

          <p>
            Отправьте сообщение — ответ получателя
            появится здесь автоматически.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
