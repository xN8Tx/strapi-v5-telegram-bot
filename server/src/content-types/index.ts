import { PLUGIN_ID } from '../constants';

import token from './token';
import user from './user';

export default {
  [`${PLUGIN_ID}-token`]: { schema: token },
  [`${PLUGIN_ID}-user`]: { schema: user },
};
