import { PLUGIN_ID } from '../constants';

export default {
  kind: 'collectionType',
  collectionName: `${PLUGIN_ID}-user`,
  info: {
    singularName: `${PLUGIN_ID}-user`,
    pluralName: `${PLUGIN_ID}-users`,
    displayName: 'Users for telegram',
    description: 'Setup your telegram bot users here.',
  },
  attributes: {
    title: {
      type: 'string',
      require: false,
    },
    userId: {
      type: 'string',
      unique: true,
      required: true,
      configurable: false,
      minLength: 1,
    },
  },
};
