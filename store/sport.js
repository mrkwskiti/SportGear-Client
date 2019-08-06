import ApiService from '~/services/ApiService'

const init = { id: null, users: [] }

export default {
  state() {
    return {
      id: null,
      users: [],
      edited: false,
      sports: null
    }
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
    sportList: state => {
      return state.sports ? Object.keys(state.sports) : []
    },
    competitionList: state => sport => {
      return sport ? Object.keys(state.sports[sport].type) : 0
    },
    teams: state => (sport, competition) => {
      return sport && competition
        ? state.sports[sport].type[competition].teams
        : 0
    },
    eachTeam: state => (sport, competition) => {
      return sport && competition
        ? state.sport[sport].type[competition].eachTeam
        : 0
    },
    sportId: state => (sportName, typeName) => {
      const sports = state.sports.filter(
        sport => sport.sport_name === sportName
      )
      return sports.filter(sport => sport.sport_type === typeName)[0].id
    },
    usersId: state => {
      return state.users.map(user => user.id)
    }
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user)
    },
    fetchSport({ commit, getters }, { sport, competition, team }) {
      return ApiService.fetchUsers({
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
    patchUsers({ commit, state, getters }, { sport, competition }) {
      return ApiService.patchUsers({
        teamId: state.id,
        users: getters.usersId,
        sportId: getters.sportId(sport, competition)
      })
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
        users: getters.usersId,
        sportId: getters.sportId(sport, competition)
      })
    }
  }
}
