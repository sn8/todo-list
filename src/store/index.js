import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';

import todo from './modules/todo';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const persistedStateOptions = {
  paths: ['todo'],
};
const plugins = [
  createPersistedState(persistedStateOptions),
  ...(debug ? [createLogger()] : []),
];

export default new Vuex.Store({
  plugins,
  modules: {
    todo,
  },
  strict: debug,
});
