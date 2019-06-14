<template>
  <div class="container grid">
    <h2 class="title">Log in</h2>
    <div class="columns">
      <div class="column">
        <b-input v-model="data.user" placeholder="User name"></b-input>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-input
          v-model="data.password"
          type="password"
          placeholder="Password"
        ></b-input>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-field grouped position="is-centered">
          <b-button class="is-primary" @click="login">Login</b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      data: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('login', ['loginUniver']),
    login() {
      this.loginUniver(this.data).then(() => {
        this.$router.push({ name: 'sign-up' })
      })
    }
  }
}
</script>

<style>
h2 {
  padding: 60px 0 0 0;
}
.grid {
  display: grid;
  grid-template-columns: [xl-start] 1fr 1.5rem [md-start] minmax(0, 259px) [md-end] 1.5rem 1fr [xl-end];
}

.grid * {
  grid-column: md;
}
.grid-xl {
  grid-column: xl;
}
</style>
