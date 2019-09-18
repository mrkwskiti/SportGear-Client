<template>
  <!--<div class="container grid">
    <div class="column has-text-centered">
      <p class="title">Change password</p>
      <div class="columns">
        <div class="column">
          <section>
            <b-field>
              <b-input
                v.model="data.password"
                placeholder="old password"
                type="password"
              >
              </b-input>
            </b-field>
            <b-field>
              <b-input
                v-model="data.newpassword"
                placeholder="new password"
                type="new-password"
              ></b-input
            ></b-field>
            <b-field>
              <b-input
                v-model="data.reEnternewpassword"
                placeholder="re-enter new password"
                type="new-password"
                @keypress.native.enter="changePass"
              ></b-input
            ></b-field>
            <b-button class="is-primary">
              Submit new password
            </b-button>
            <br />
            <b-button
              rounded
              type="is-light"
              style="margin-top : 10px"
              tag="router-link"
              to="/sign-up"
            >
              Cancle
            </b-button>
          </section>
        </div>
      </div>
    </div>
  </div>-->
  <div class="container grid">
    <div class="columns">
      <div class=" column has-text-centered">
        <p class="title is-3">Change Password</p>
        <div class="field">
          <div class="control">
            <input
              class="input is-medium "
              type="password"
              placeholder="old password"
            />
            <input
              class="input is-medium"
              type="password"
              placeholder="new password"
            />
            <input
              class="input is-medium"
              type="password"
              placeholder="re-enter new password"
            />
          </div>
          <button class="button is-primary is-fullwidth">
            Change Password
          </button>
          <button class="button is-light is-fullwidth">
            Cancle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        password: '',
        newpassword: '',
        reEnternewpassword: ''
      }
    }
  },
  methods: {}
}
</script>

<style>
.title {
  margin-top: 60px;
}
.input {
  margin-bottom: 10px;
}
.button {
  margin-bottom: 10px;
}
</style>
