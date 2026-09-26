import type {
  ChangeEvent,
  KeyboardEvent,
} from "react";

interface MessageInputProps {
  value: string;
  sending: boolean;
  onChange: (value: string) => void;
  onKeyDown: (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => void;
  onSend: () => void;
}

function MessageInput({
  value,
  sending,
  onChange,
  onKeyDown,
  onSend,
}: MessageInputProps) {
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };

  return (
    <footer className="message-form">
      <textarea
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder="Напишите сообщение..."
        rows={1}
        disabled={sending}
      />

      <button
        type="button"
        className="send-button"
        disabled={!value.trim() || sending}
        onClick={onSend}
        aria-label="Отправить сообщение"
      >
        {sending ? "…" : "➤"}
      </button>
    </footer>
  );
}

export default MessageInput;
