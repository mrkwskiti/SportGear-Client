<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div id="logo-figure" class="column is-flex is-half">
            <figure>
              <img id="logo" src="~/assets/logo.png" alt="" />
            </figure>
          </div>
          <div class="column is-half">
            <div class="content">
              <p class="subtitle is-2">
                lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    // Card
  }
}
</script>

<style>
#logo-figure {
}

#logo {
  height: auto;
  max-width: 100%;
}
</style>
