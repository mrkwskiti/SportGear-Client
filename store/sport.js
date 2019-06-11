import ApiService from '~/services/ApiService'

const init = { id: 0, users: [] }

export default {
  state: {
    id: 0,
    users: [],
    edited: false
  },
  mutations: {
    ADD_USER(state, { sid, firstName, lastName }) {
      state.users.push({ sid, firstName, lastName })
      state.edited = true
    },
    SET_USERS(state, data) {
      state.id = data.id
      state.users = data.users
    }
  },
  actions: {
    addUser({ commit }, { sid, firstName, lastName }) {
      commit('ADD_USER', { sid, firstName, lastName })
    },
    fetchSport({ commit }, { sport, competition, team }) {
      return ApiService.fetchUsers(sport, competition, team)
        .then(res => {
          commit('SET_USERS', res.data[0])
        })
        .catch(() => {
          commit('SET_USERS', init)
        })
    },
    resetUsers({ commit }) {
      commit('SET_USERS', init)
    },
    patchUsers({ commit, state }) {
      ApiService.patchUsers({ id: state.id, users: state.users })
    }
  }
}
