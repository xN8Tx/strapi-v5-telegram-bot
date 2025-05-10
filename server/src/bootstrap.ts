import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from './constants';

const registerPermissionActions = async () => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Access to telegram bot',
      uid: 'read',
      pluginName: PLUGIN_ID,
    },
  ];

  await strapi.service('admin::permission').actionProvider.registerMany(actions);
};

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  await registerPermissionActions();

  const telegramSender = strapi.plugin(PLUGIN_ID).service('telegramSender');

  strapi.db.lifecycles.subscribe({
    models: [`plugin::${PLUGIN_ID}.${PLUGIN_ID}-token`],
    async afterCreate() {
      await telegramSender.setTelegramId();
    },
    async afterUpdate() {
      await telegramSender.setTelegramId();
    },
    async afterDelete() {
      await telegramSender.setTelegramId();
    },
  });

  strapi.db.lifecycles.subscribe({
    models: [`plugin::${PLUGIN_ID}.${PLUGIN_ID}-user`],
    async afterCreate() {
      await telegramSender.setTelegramUser();
    },
    async afterUpdate() {
      await telegramSender.setTelegramUser();
    },
    async afterDelete() {
      await telegramSender.setTelegramUser();
    },
  });
};

export default bootstrap;
