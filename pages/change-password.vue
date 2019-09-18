<template>
  <div class="container grid">
    <div class="columns">
      <div class=" column has-text-centered">
        <p class="title is-3">Change Password</p>
        <div class="field">
          <div class="control">
            <input
              v-model="data.password"
              class="input is-medium "
              type="password"
              placeholder="old password"
            />
            <input
              id="check"
              v-model="data.newpassword"
              class="input is-medium"
              type="password"
              placeholder="new password"
            />
            <input
              v-model="data.reEnternewpassword"
              class="input is-medium"
              type="password"
              placeholder="re-enter new password"
            />
            <div class="content">
              <div v-show="ishidden">
                <p v-if="data.newpassword === data.reEnternewpassword">
                  Password match
                </p>
                <!-- how to change color to this paragraph ???-->
                <p v-else>
                  Password Doesn't match
                </p>
              </div>
            </div>
          </div>
          <b-button class="is-primary is-fullwidth" @click="ishidden = true">
            Change Password
          </b-button>
          <b-button
            class="is-fullwidth"
            tag="router-link"
            outlined
            to="sign-up"
          >
            Cancle
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ishidden: false,
      data: {
        password: '',
        newpassword: '',
        reEnternewpassword: ''
      }
    }
  }
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
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
