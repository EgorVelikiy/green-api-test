WhatsApp Chat
Требования:

1. Node.js 22+

2. npm

3. Аккаунт в Green-API

4. Созданный и авторизованный WhatsApp instance в Green-API


Установка:

1. Клонировать репозиторий:

```bash
git clone <repository-url>
```

2. Перейти в директорию проекта:

```bash
cd whatsapp-chat
```

3. Установить зависимости:

```bash
npm ci
```

Запуск:

1. Запустить проект в режиме разработки:

```bash
npm run dev
```

2. Настройка Green-API
После запуска приложения необходимо указать данные Green-API:

   1. ID Instance

   2. API Token Instance

   3. номер телефона получателя

ID Instance и API Token Instance можно получить в личном кабинете Green-API.

Перед использованием WhatsApp instance должен быть авторизован и подключён к WhatsApp.

После успешного подключения можно отправлять и получать текстовые сообщения.