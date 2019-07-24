<template>
  <div>
    <span>
      <b-icon
        id="univer-icon"
        type="is-dark"
        pack="fas"
        icon="university"
      ></b-icon>
    </span>
    <span id="name-label" class="has-text-dark is-hidden-mobile">
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
  top: 6px;
  right: 5px;
}

#name-label {
  text-align: center;
  vertical-align: middle;
}
</style>
