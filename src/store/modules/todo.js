const state = {
  items: [],
  incrementIndex: 0,
};

const actions = {
  setItems({ commit }, items) {
    commit('setItems', items);
  },

  add({ state, commit }) {
    commit('increment');
    commit('add', {
      localId: state.incrementIndex,
      content: '',
      done: false,
    });
  },

  update({ commit }, { item, content }) {
    commit('update', { item, content });
  },

  toggle({ commit }, item) {
    commit('update', { item, done: !item.done });
  },

  remove({ commit }, item) {
    commit('remove', item);
  },
};

const mutations = {
  increment(state) {
    state.incrementIndex += 1;
  },

  setItems(state, items) {
    state.items = items;
  },

  add(state, item) {
    state.items.push(item);
  },

  update(state, { item, content = item.content, done = item.done }) {
    item.content = content;
    item.done = done;
  },

  remove(state, item) {
    state.items.splice(state.items.indexOf(item), 1);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
