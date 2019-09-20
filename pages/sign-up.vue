<template>
  <div>
    <div class="contrainer grid">
      <div class="columns">
        <div class="column">
          <h2 class="title is-1">{{ $t('SignUp.Signup') }}</h2>
        </div>
      </div>
      <div class="field">
        <b-button
          id="main-button"
          class="is-fullwidth"
          tag="router-link"
          :to="localePath('import-users')"
        >
          <p class="subtitle is-3">{{ $t('SignUp.ImportAthletes') }}</p>
        </b-button>
      </div>
      <div class="field">
        <b-button
          id="main-button"
          class="is-fullwidth"
          tag="router-link"
          :to="localePath('import-team')"
        >
          <p class="subtitle is-3">{{ $t('SignUp.ImportTeam') }}</p>
        </b-button>
      </div>
      <div class="field">
        <b-button
          id="main-button"
          class="is-fullwidth"
          tag="router-link"
          to="/import-staff"
        >
          <p class="subtitle is-3">Import/edit staff</p>
        </b-button>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  layout: 'register'
}
</script>

<style>
h2 {
  padding: 60px 0 0 0;
}

#main-button {
  height: 139px;
}

.grid {
  display: grid;
  grid-template-columns: [xl-start] 1fr 1.5rem [md-start] minmax(0, 624px) [md-end] 1.5rem 1fr [xl-end];
}

.grid * {
  grid-column: md;
}
.grid-xl {
  grid-column: xl;
}
</style>
