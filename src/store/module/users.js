const state = {
  currentUser: '',
};

const getters = {
  currentUser (state) {
    return state.currentUser;
  },
};

const mutations = {
  userStatus (state, user) {
    if (user) {
      state.currentUser = user;
      state.isLogin = true;
    } else {
      state.currentUser = null;
      state.isLogin = false;
    }
  },
};

const actions = {
  setUser ({commit}, user){
    commit('userStatus', user);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
