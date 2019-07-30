<template>
  <div>
    <nav-bar />
    <nuxt />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  head: {
    title: 'Jhanglek Games'
  }
}
</script>

<style lang="scss" scoped></style>
