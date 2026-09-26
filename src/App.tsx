import AuthForm from "./components/AuthForm/AuthForm";
import Chat from "./components/Chat/Chat";
import { useChat } from "./hooks/useChat";

import "./App.css";

function App() {
  const {
    connected,
    auth,
    chat,
  } = useChat();

  if (!connected) {
    return (
      <AuthForm
        idInstance={auth.idInstance}
        apiToken={auth.apiToken}
        phone={auth.phone}
        connecting={auth.connecting}
        error={auth.error}
        onIdInstanceChange={auth.setIdInstance}
        onApiTokenChange={auth.setApiToken}
        onPhoneChange={auth.setPhone}
        onSubmit={auth.handleConnect}
      />
    );
  }

  return (
    <Chat
      phone={chat.phone}
      messages={chat.messages}
      message={chat.message}
      sending={chat.sending}
      error={chat.error}
      messagesEndRef={chat.messagesEndRef}
      onClose={chat.handleCloseChat}
      onMessageChange={chat.setMessage}
      onMessageKeyDown={chat.handleMessageKeyDown}
      onSend={chat.handleSend}
    />
  );
}

export default App;
