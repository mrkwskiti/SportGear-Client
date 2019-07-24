import ApiService from '~/services/ApiService'

export default {
  state: {
    univer: {
      id: null,
      username: '',
      university: '',
      sid: []
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
    }
  },
  actions: {
    async loginUniver({ commit, state }, credentials) {
      await ApiService.loginUniver(credentials).then(res => {
        commit('ADD_UNIVER', res)
      })
      await ApiService.sidList().then(res => {
        commit('ADD_SIDLIST', res)
      })
    }
  }
}
