import type {
  KeyboardEvent,
  RefObject,
} from "react";

import type { ChatMessage } from "../../types/chat";
import ChatHeader from "./ChatHeader/ChatHeader";
import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";

interface ChatProps {
  phone: string;
  messages: ChatMessage[];
  message: string;
  sending: boolean;
  error: string;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onMessageChange: (value: string) => void;
  onMessageKeyDown: (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => void;
  onSend: () => void;
}

function Chat({
  phone,
  messages,
  message,
  sending,
  error,
  messagesEndRef,
  onClose,
  onMessageChange,
  onMessageKeyDown,
  onSend,
}: ChatProps) {
  return (
    <main className="app">
      <section className="chat">
        <ChatHeader
          phone={phone}
          onClose={onClose}
        />

        <MessageList
          messages={messages}
          messagesEndRef={messagesEndRef}
        />

        {error && (
          <div className="chat-error">
            {error}
          </div>
        )}

        <MessageInput
          value={message}
          sending={sending}
          onChange={onMessageChange}
          onKeyDown={onMessageKeyDown}
          onSend={onSend}
        />
      </section>
    </main>
  );
}

export default Chat;
