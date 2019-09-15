<template>
  <div class="container grid">
    <div class="columns">
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
                  @keypress.native.enter="changePass"
                ></b-input
              ></b-field>
              <b-button class="is-primary is-fullwidth" @click="changePass">
                Submit new password
              </b-button>
              <b-button
                class="is-fullwidth"
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
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      data: {
        password: '',
        newpassword: ''
      }
    }
  },
  methond: {
    ...mapActions('change', ['changepassword']),
    changePass() {
      const loadingComponent = this.$loading.open()
      this.changepassword(this.data)
        .them(() => {
          // how to compare twopassword
          this.$router.push({ name: 'changepass' })
        })
        .catch(e => {
          this.$notification.open({
            duration: 5000,
            message: 'Change Passwordb failed' + '<br>' + e,
            postion: 'is-bottom-right',
            type: 'is-danger',
            hasIcon: true
          })
        })
        .finally(() => {
          loadingComponent.close()
        })
    }
  }
}
</script>

<style>
.title {
  margin-top: 60px;
}
</style>
