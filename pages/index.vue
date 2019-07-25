<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div id="logo-figure" class="column is-flex is-half">
            <figure>
              <img id="logo" src="~/static/logo.png" alt="" />
            </figure>
          </div>
          <div class="column is-half">
            <div class="columns">
              <div class="column has-text-centered" style="max-width: 520px;">
                <h1 class="is-size-3-mobile is-size-1 has-text-weight-bold">
                  Jhanglek Games
                </h1>
                <p class="is-size-4 padding-top-1x">
                  23-28 December 2019
                </p>
                <p class="is-size-5">
                  Faculty of Engineering, Chiang mai University
                </p>
                <div class="has-padding-2x"></div>
              </div>
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
  max-width: 500px;
}

#logo {
  height: auto;
  max-width: 100%;
}
</style>
