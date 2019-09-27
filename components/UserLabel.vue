<template>
  <div v-if="uni" class="navbar-item">
    <div class="has-text-right">
      <b-button tag="router-link" to="/change-password"
        >Change password</b-button
      >
    </div>
    <div class="navbar-item is-hidden-touch">
      <b-icon
        id="univer-icon"
        type="is-dark"
        size="is-small"
        pack="fas"
        icon="university"
      ></b-icon>
      <span id="uni-label" class="has-text-dark is-hidden-mobile">
        {{ uni }}
      </span>
    </div>
    <div class="navbar-item" style="padding-right: 0">
      <b-button rounded type="is-light" @click="logout">{{
        $t('logout.logOutButton')
      }}</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({ uni: 'login/uniFullnameLogged' })
  },
  methods: {
    ...mapActions({ removeUni: 'login/logoutUniver' }),
    async logout() {
      const loadingComponent = this.$loading.open()
      await this.removeUni()
      this.$router.push(this.localePath({ name: 'index' }))
      loadingComponent.close()
    }
  }
}
</script>

<style>
#univer-icon {
  position: relative;
  /* top: 6px;
  right: 5px; */
}

#uni-label {
  padding-left: 6px;
}

#name-label {
  text-align: center;
  vertical-align: middle;
}
</style>
