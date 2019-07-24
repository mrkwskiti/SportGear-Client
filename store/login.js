import ApiService from '~/services/ApiService'

export default {
  state: {
    univer: {
      id: null,
      username: '',
      university: '',
      sid: [],
      users: []
    }
  },
  getters: {
    uniLogged: state => {
      return state.univer.uni
    },
    uniFullnameLogged: state => {
      return state.univer.fullname
    }
  },
  mutations: {
    ADD_UNIVER(state, credentials) {
      state.univer = credentials
    },
    ADD_SIDLIST(state, list) {
      state.univer.sid = list
    },
    ADD_USERS(state, users) {
      state.univer.users = users
    }
  },
  actions: {
    loginUniver({ commit, state }, credentials) {
      return ApiService.loginUniver(credentials).then(res => {
        commit('ADD_UNIVER', res)
      })
    },
    fetchSid({ commit }) {
      return ApiService.sidList().then(res => {
        commit('ADD_SIDLIST', res)
      })
    },
    fetchUsers({ commit, state }) {
      return ApiService.fetchUsersInUni().then(res => {
        commit('ADD_USERS', res)
      })
    }
  }
}
