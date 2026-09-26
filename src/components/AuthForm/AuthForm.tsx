import type { FormEvent } from "react";

interface AuthFormProps {
  idInstance: string;
  apiToken: string;
  phone: string;
  connecting: boolean;
  error: string;
  onIdInstanceChange: (value: string) => void;
  onApiTokenChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function AuthForm({
  idInstance,
  apiToken,
  phone,
  connecting,
  error,
  onIdInstanceChange,
  onApiTokenChange,
  onPhoneChange,
  onSubmit,
}: AuthFormProps) {
  return (
    <main className="app">
      <section className="setup-card">
        <div className="setup-header">
          <div className="logo">M</div>

          <div>
            <h1>WhatsApp Chat</h1>

            <p>
              Подключите Green-API и начните переписку
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="setup-form"
        >
          <label>
            <span>ID Instance</span>

            <input
              value={idInstance}
              onChange={(event) =>
                onIdInstanceChange(event.target.value)
              }
              placeholder="Например: 1101234567"
              autoComplete="off"
            />
          </label>

          <label>
            <span>API Token Instance</span>

            <input
              value={apiToken}
              onChange={(event) =>
                onApiTokenChange(event.target.value)
              }
              placeholder="Введите API token"
              type="password"
              autoComplete="off"
            />
          </label>

          <label>
            <span>Номер получателя</span>

            <input
              value={phone}
              onChange={(event) =>
                onPhoneChange(event.target.value)
              }
              placeholder="+7 999 123-45-67"
              inputMode="tel"
              autoComplete="off"
            />
          </label>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={connecting}
          >
            {connecting
              ? "Подключение..."
              : "Открыть чат"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthForm;
