import ApiService from '~/services/ApiService'

export default {
  state() {
    return {
      users: {}
    }
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    }
  },
  actions: {
    fetchSport({ commit }, { sport, competition, team }) {
      return ApiService.fetchUsers(sport, competition, team).then(res => {
        console.log(res.data)
        commit('SET_USERS', res.data)
      })
    }
  }
}
