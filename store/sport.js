import ApiService from '~/services/ApiService'

const init = { id: 0, users: [] }

export default {
  state: {
    id: 0,
    users: [],
    edited: false,
    sports: {}
  },
  mutations: {
    ADD_USER(state, user) {
      state.users.push(user)
      state.edited = true
    },
    SET_USERS(state, data) {
      state.id = data.id
      state.users = data.users
    },
    REMOVE_USER(state, id) {
      const removeIndex = state.users.map(user => user.id).indexOf(id)
      state.users.splice(removeIndex, 1)
      state.edited = true
    },
    SET_SPORTS(state, sports) {
      state.sports = sports
    }
  },
  getters: {
    sportId: state => (sportName, typeName) => {
      const sports = state.sport.fillter(
        sport => sport.sport_name === sportName
      )
      return sports.fillter(sport => sport.sport_type === typeName)
    }
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user)
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
    getListSport({ commit }) {
      return ApiService.getListSport().then(res => {
        commit('SET_SPORTS', res)
      })
    },
    resetUsers({ commit }) {
      commit('SET_USERS', init)
    },
    patchUsers({ commit, state }) {
      ApiService.patchUsers({ id: state.id, users: state.users })
    },
    postUsers({ commit, state }, { sport, competition, team }) {
      // TODO: post at api
      ApiService.postUsers({
        id: state.id,
        users: state.users,
        sport,
        competition,
        team
      })
    },
    removeUser({ commit }, id) {
      commit('REMOVE_USER', id)
    }
  }
}
