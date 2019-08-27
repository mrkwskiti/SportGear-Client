<template>
  <div class="container">
    <footer class="footer">
      <!-- <div class="hero-body"> -->
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="level has-padding-2x">
              <div class="level-left">
                <div class="content has-text-centered-mobile">
                  {{ $t('Footer.where') }}
                </div>
              </div>
              <div class="level-right">
                <div class="has-text-right">
                  <nuxt-link
                    v-for="locale in availableLocales"
                    :key="locale.code"
                    :to="switchLocalePath(locale.code)"
                    >{{ locale.name }}</nuxt-link
                  >
                </div>
              </div>
            </div>
            <!-- <div class="content has-text-centered">
                <p>
                  <strong>Bulma</strong> by
                  <a href="https://jgthms.com">Jeremy Thomas</a>. The source
                  code is licensed
                  <a href="http://opensource.org/licenses/mit-license.php"
                    >MIT</a
                  >. The website content is licensed
                  <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                    >CC BY NC SA 4.0</a
                  >.
                </p>
              </div> -->
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- <div class="hero-footer">
        <div class="container">
          <div class="columns">
            <div class="column">
              test
            </div>
          </div>
        </div>
      </div> -->
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 10em 2em 4em;
}
</style>
