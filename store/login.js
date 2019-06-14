import ApiService from '~/services/ApiService'

export default {
  state: {
    univer: {
      id: null,
      username: '',
      university: ''
    }
  },
  mutations: {
    ADD_UNIVER(state, credentials) {
      state.univer = credentials
    }
  },
  actions: {
    loginUniver({ commit }, credentials) {
      ApiService.loginUniver(credentials).then(res => {
        commit('ADD_UNIVER', res)
      })
    }
  }
}
