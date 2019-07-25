<template>
  <div class="container grid-login">
    <section id="login" class="contanier">
      <div class="columns is-mobile is-centered">
        <div class="column" style="max-width: 190px;">
          <figure>
            <img src="~/static/logo.png" alt="" />
          </figure>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <p class="title">Log in</p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <section>
            <b-field>
              <b-input v-model="data.user" placeholder="User name"></b-input>
            </b-field>
            <b-field>
              <b-input
                v-model="data.password"
                type="password"
                placeholder="Password"
              ></b-input>
            </b-field>
          </section>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-button class="is-primary is-fullwidth" @click="login">
            Login
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'register',
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
  padding: 20px 0 20px 0;
}

#login {
  margin-top: 60px;
  padding-top: 40px;
  padding-bottom: 40px;
}

.grid-login {
  display: grid;
  grid-template-columns: [xl-start] 1fr 1.5rem [md-start] minmax(0, 300px) [md-end] 1.5rem 1fr [xl-end];
}

.grid-login * {
  grid-column: md;
}
.grid-login-xl {
  grid-column: xl;
}
</style>
