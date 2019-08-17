export default {
  state() {
    return {
      univer: {
        id: null,
        uni: '',
        fullname: ''
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
    }
  },
  actions: {
    loginUniver({ commit }, { user, password }) {
      return this.$axios
        .post('/services/university/login', { uni: user, pwd: password })
        .then(res => {
          commit('ADD_UNIVER', res.data)
        })
    },
    fetchUni({ commit }) {
      return this.$axios.get('/services/university').then(res => {
        commit('ADD_UNIVER', res.data)
      })
    }
  }
}
