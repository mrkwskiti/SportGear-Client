<template>
  <div>
    <nav-bar />

    <!-- <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside> -->

    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import FooterBar from '~/components/Footer.vue'

export default {
  components: {
    NavBar,
    FooterBar
  },
  head: {
    title: 'Jhanglek Games'
  }
}
</script>
