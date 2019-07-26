<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-half">
            <div class="columns is-mobile is-centered">
              <div id="logo-figure" class="column">
                <figure>
                  <img id="logo" src="~/static/logo.png" alt="" />
                </figure>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="columns is-mobile is-centered">
              <div class="column has-text-centered" style="max-width: 520px;">
                <h1 class="is-size-3-mobile is-size-1 has-text-weight-bold">
                  Jhanglek Games
                </h1>
                <p class="is-size-4">
                  23-28 December 2019
                </p>
                <div class="container">
                  <b-icon
                    type="is-primary"
                    pack="fas"
                    icon="map-marker-alt"
                    style="position: relative; top: 5px;"
                  ></b-icon>
                  <span>
                    Faculty of Engineering, Chiang mai University
                  </span>
                </div>
                <b-button
                  tag="router-link"
                  to="/log-in"
                  class="is-primary has-padding-top-5"
                  style="margin: 1em"
                  >Register athletes/teams</b-button
                >
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
