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
      type: 'UNIT',
      title: '',
    });
  },
  update({ state, commit }, { item, title }) {
    commit('update', { item, title });
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
  update(state, { item, title = item.title }) {
    item.title = title;
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
