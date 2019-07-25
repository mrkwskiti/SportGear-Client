<template>
  <div class="navbar-item">
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ uni: 'login/uniFullnameLogged' })
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
