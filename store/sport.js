import ApiService from '~/services/ApiService'

export default {
  state() {
    return {
      users: []
    }
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    }
  },
  actions: {
    fetchSport({ commit }, { sport, competition, team }) {
      return ApiService.fetchUsers(sport, competition, team)
        .then(res => {
          commit('SET_USERS', res.data[0].users)
        })
        .catch(() => {
          commit('SET_USERS', [])
        })
    },
    resetUsers({ commit }) {
      commit('SET_USERS', [])
    }
  }
}
