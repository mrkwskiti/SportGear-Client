export default {
  actions: {
    async nuxtServerInit({ dispatch }, { req }) {
      try {
        await dispatch('login/fetchUni')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
