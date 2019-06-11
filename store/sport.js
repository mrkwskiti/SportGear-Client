import ApiService from '~/services/ApiService'

export default {
  state: {
    users: []
  },
  mutations: {
    ADD_USER(state, { sid, firstName, lastName }) {
      state.users.push({ sid, firstName, lastName })
    },
    SET_USERS(state, users) {
      state.users = users
    }
  },
  actions: {
    addUser({ commit }, { sid, firstName, lastName }) {
      commit('ADD_USER', { sid, firstName, lastName })
    },
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
