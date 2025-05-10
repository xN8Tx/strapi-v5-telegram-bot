import type { Core } from '@strapi/strapi';

import { PLUGIN_ID } from '../constants';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

const telegramSender = ({ strapi }: { strapi: Core.Strapi }) => ({
  token: null,
  telegramUsers: [],

  async setTelegramId() {
    const tokenResponse = await strapi
      .documents(`plugin::${PLUGIN_ID}.${PLUGIN_ID}-token`)
      .findMany();

    if (!tokenResponse || tokenResponse.length === 0) {
      strapi.log.error(
        `Telegram bot token for plugin ${PLUGIN_ID} is not configured. Please configure it in the Strapi admin panel.`
      );

      this.token = null;
      return false;
    }

    this.token = tokenResponse[0].key;
    return true;
  },

  async setTelegramUser() {
    const usersResponse = await strapi
      .documents(`plugin::${PLUGIN_ID}.${PLUGIN_ID}-user`)
      .findMany();

    if (!usersResponse || usersResponse.length === 0) {
      strapi.log.error(
        `Telegram bot users for plugin ${PLUGIN_ID} is not configured. Please configure it in the Strapi admin panel.`
      );

      this.telegramUsers = [];
      return false;
    }

    this.telegramUsers = usersResponse.map((el) => el.userId);
    return true;
  },

  async sendMessage(message: string) {
    if (!this.token) {
      const isTokenSet = await this.setTelegramId();
      if (!isTokenSet) return;
    }

    if (this.telegramUsers.length === 0) {
      const isUsersSet = await this.setTelegramUser();
      if (!isUsersSet) return;
    }

    const requests = this.telegramUsers.map(async (el) => {
      await strapi.fetch(`${TELEGRAM_API_URL}${this.token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: el,
          text: message,
        }),
      });
    });

    return await Promise.allSettled(requests);
  },
});

export default telegramSender;
