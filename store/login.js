import ApiService from '~/services/ApiService'

export default {
  state: {
    univer: {
      id: null,
      username: '',
      university: ''
    }
  },
  getters: {
    uniLogged: state => {
      return state.univer.uni
    }
  },
  mutations: {
    ADD_UNIVER(state, credentials) {
      state.univer = credentials
    }
  },
  actions: {
    loginUniver({ commit }, credentials) {
      return ApiService.loginUniver(credentials).then(res => {
        commit('ADD_UNIVER', res)
      })
    }
  }
}
