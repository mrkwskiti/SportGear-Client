import ApiService from '~/services/ApiService'

const init = { id: null, users: [] }

export default {
  state: {
    id: null,
    users: [],
    edited: false,
    sports: []
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
      const sports = state.sports.filter(
        sport => sport.sport_name === sportName
      )
      return sports.filter(sport => sport.sport_type === typeName)[0].id
    }
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user)
    },
    fetchSport({ commit, getters }, { sport, competition, team, uni }) {
      return ApiService.fetchUsers({
        uni,
        team,
        teamId: getters.sportId(sport, competition)
      })
        .then(res => {
          // TODO; debug
          console.log(res)
          commit('SET_USERS', res)
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
    removeUser({ commit }, id) {
      commit('REMOVE_USER', id)
    },
    // Add new team
    async postTeam(
      { state, commit, getters },
      { sport, competition, team, uni }
    ) {
      const id = await ApiService.postTeam({
        team,
        sportId: getters.sportId(sport, competition),
        uni
      })
      await ApiService.postUsers({
        teamId: id,
        users: state.users.map(user => user.id),
        sportId: getters.sportId(sport, competition)
      })
    }
  }
}
