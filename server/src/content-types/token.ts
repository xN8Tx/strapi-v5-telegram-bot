import { PLUGIN_ID } from '../constants';

export default {
  kind: 'singleType',
  collectionName: `${PLUGIN_ID}-token`,
  info: {
    singularName: `${PLUGIN_ID}-token`,
    pluralName: `${PLUGIN_ID}-tokens`,
    displayName: 'Token for telegram',
    description: 'Setup your telegram bot token here.',
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: false,
    },
  },
  attributes: {
    key: {
      type: 'string',
      required: true,
      minLength: 30,
      configurable: false,
      regex: '^[0-9]{8,10}:[a-zA-Z0-9_-]{35}',
    },
  },
};
