<template>
  <div class="container grid">
    <div class="columns">
      <div class=" column has-text-centered">
        <p class="title is-3">Change Password</p>
        <div class="field">
          <div class="control">
            <input
              v-model="data.old_password"
              class="input is-medium "
              type="password"
              placeholder="old password"
            />
            <input
              id="check"
              v-model="data.password"
              class="input is-medium"
              type="password"
              placeholder="new password"
            />
            <input
              v-model="data.confirm_password"
              class="input is-medium"
              type="password"
              placeholder="re-enter new password"
            />
            <div class="content">
              <div v-show="ishidden">
                <p v-if="data.password === data.confirm_password">
                  Password match
                </p>
                <!-- how to change color to this paragraph ???-->
                <p v-else>
                  Password Doesn't match
                </p>
              </div>
            </div>
          </div>
          <b-button class="is-primary is-fullwidth" @click="changepassword">
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
  layout: 'register',
  middleware: 'authenticated',
  data() {
    return {
      ishidden: false,
      data: {
        old_password: '',
        password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    async changepassword() {
      const loadingComponent = this.$loading.open()
      this.ishidden = true
      try {
        console.log('changing')
        await this.$axios.patch('/services/university/password', this.data)
        console.log('changed')
        this.$notification.open({
          duration: 5000,
          message: 'Password Change',
          position: 'is-bottom-right',
          type: 'is-success',
          hasIcon: true
        })
      } catch (e) {
        this.$notification.open({
          duration: 5000,
          message: `Fail to change password<br/>${e}<br/>Please try again`,
          position: 'is-bottom-right',
          type: 'is-danger',
          hasIcon: true
        })
      }
      loadingComponent.close()
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
