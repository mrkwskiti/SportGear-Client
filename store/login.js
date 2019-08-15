import ApiService from '~/services/ApiService'

export default {
  state() {
    return {
      univer: {
        id: null,
        username: '',
        university: '',
        sid: [],
        users: []
      }
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
    loginUniver({ commit, state }, { user, password }) {
      return this.$axios
        .post('/services/university/login', { uni: user, pwd: password })
        .then(res => {
          commit('ADD_UNIVER', res.data)
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
    },
    fetchUni({ commit }, token) {
      return this.$axios.get('/services/university').then(res => {
        commit('ADD_UNIVER', res.data)
      })
    }
  }
}
