import './ChatHeader.css'

interface ChatHeaderProps {
  phone: string;
  onClose: () => void;
}

function ChatHeader({
  phone,
  onClose,
}: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <div className="chat-user">
        <div className="avatar">
          {phone.slice(-2)}
        </div>

        <div>
          <strong>+{phone}</strong>

          <span className="connection-status">
            <i />
            WhatsApp подключён
          </span>
        </div>
      </div>

      <button
        type="button"
        className="icon-button"
        onClick={onClose}
        aria-label="Закрыть чат"
      >
        ×
      </button>
    </header>
  );
}

export default ChatHeader;
