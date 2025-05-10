<h1 align="center">✨ Strapi  Telegram Bot ✨</h1>
<p align="center">Send messages to your telegram bot from strapi</p>

## 🚀 Installation

Install the plugin using your favorite package manager:

```sh
npm install strapi-v5-telegram-bot
```

or

```sh
yarn add strapi-v5-telegram-bot
```

## ⚡ Features

- Send messages to your telegram bot from admin panel and code
- Manage users and bot token in admin panel

## 🌟 Usage

### 1. Configure Bot Token

To get started, you first need to add your **Telegram bot token**, which can be obtained from [@BotFather](https://t.me/BotFather) in Telegram.

Save the token in the **single-type collection** named `Token for telegram` in the admin panel.

### 2. Add User IDs

Next, add the **user IDs** of the recipients you want the bot to message.

Create entries in the **collection type** called `Users for telegram`.
If you're unsure how to find your user ID, [this guide might help](https://www.google.com/search?q=how+to+find+your+user+id+in+telegram).

### 3. Test the Plugin

You can test the plugin by sending a message directly from the plugin interface — click the **paper plane icon** in the sidebar.

### 4. Sending Messages Programmatically

If you need to send a message from your code, use the following pattern:

```js
const telegramSender = strapi.plugin('strapi-v5-telegram-bot').service('telegramSender');
const res = await telegramSender.sendMessage(body.message);
```

> ⚠️ **Important:**
> Do **not** destructure `telegramSender`.
> Its methods rely on internal context to access the token and user list.
> If destructured, they will lose access to that context and stop working correctly.

