export default {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/',
      handler: 'admin.sendMessage',
      config: {},
    },
  ],
};
