<template>
  <div :class="{ 'box hero is-light': isRegister }">
    <b-field :message="[!isRegister ? fullName : null]">
      <b-input v-model="user.sid" expanded placeholder="SID"></b-input>
    </b-field>

    <section v-if="isRegister">
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <b-input
              v-model="user.firstName"
              expanded
              placeholder="First Name"
            ></b-input>
          </div>
          <div class="field">
            <b-input
              v-model="user.lastName"
              expanded
              placeholder="Last Name"
            ></b-input>
          </div>
          <b-select v-model="user.gender" placeholder="Gender">
            <option>Male</option>
            <option>Female</option>
          </b-select>
        </div>
      </div>
      <b-field>
        <b-input v-model="user.email" placeholder="Email"></b-input>
      </b-field>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <a class="button is-primary is-right">
            Submit new user
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from '~/services/ApiService'

export default {
  data() {
    return {
      user: {
        sid: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        loaded: false
      },
      isRegister: false
    }
  },
  computed: {
    fullName() {
      return this.user.firstName + ' ' + this.user.lastName
    }
  },
  watch: {
    'user.sid': function(val) {
      this.fetchUser(val)
    }
  },
  methods: {
    async fetchUser(sid) {
      if (sid.length === 13) {
        const response = await ApiService.fetchUser(sid)
        this.user.loaded = true
        if (!response) {
          this.isRegister = true
        } else {
          this.isRegister = false
          this.user.firstName = response.firstName
          this.user.lastName = response.lastName
        }
      } else {
        this.user.loaded = false
        this.user.firstName = ''
        this.user.lastName = ''
      }
    }
  }
}
</script>

<style></style>
