<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-half">
            <div class="columns is-mobile is-centered">
              <div id="logo-figure" data-aos="fade-up" class="column">
                <figure>
                  <img id="logo" src="~/static/logo.png" alt="" />
                </figure>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="columns is-mobile is-centered">
              <div class="column has-text-centered" style="max-width: 520px;">
                <h1
                  data-aos="main-content"
                  data-aos-delay="500"
                  class="is-size-3-mobile is-size-1 has-text-weight-bold"
                >
                  {{ $t('index.welcome') }}
                </h1>
                <p
                  data-aos="main-content"
                  data-aos-delay="1200"
                  class="is-size-4"
                >
                  {{ $t('index.date') }}
                </p>
                <div
                  data-aos="main-content"
                  data-aos-delay="1400"
                  class="container"
                >
                  <b-icon
                    type="is-primary"
                    pack="fas"
                    icon="map-marker-alt"
                    style="position: relative; top: 5px;"
                  ></b-icon>
                  <span>
                    {{ $t('index.where') }}
                  </span>
                </div>
                <div data-aos="main-content" data-aos-delay="1600">
                  <b-button
                    tag="router-link"
                    :to="localePath('log-in')"
                    class="is-primary has-padding-top-5"
                    style="margin: 1em"
                  >
                    {{ $t('index.registerButton') }}
                  </b-button>
                </div>
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

  transitions: 'bounce',

  components: {
    // Card
  }
}
</script>

<style lang="scss">
#logo-figure {
  max-width: 500px;
}

#logo {
  height: auto;
  max-width: 100%;
}

[data-aos='main-content'] {
  &[data-aos][data-aos-duration='200'] {
    transition-duration: 200ms;
  }
  opacity: 0;
  transition-property: transform, opacity;

  &.aos-animate {
    opacity: 1;
  }

  @media screen and (max-width: 767px) {
    transform: translateY(20px);

    &.aos-animate {
      transform: translateY(0);
    }
  }

  @media screen and (min-width: 768px) {
    transform: translateX(50px);

    &.aos-animate {
      transform: translateX(0);
    }
  }
}
</style>
