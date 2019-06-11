<template>
  <div>
    <b-field
      class="field is-expanded"
      :message="[!isRegister ? fullName : null]"
    >
      <div class="field has-addons">
        <b-input v-model="user.sid" expanded placeholder="SID"></b-input>
        <p class="control">
          <a
            v-if="!isRegister"
            class="button is-primary"
            :disabled="!isFetched"
            @click="add"
          >
            Add user
          </a>
        </p>
      </div>
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
            <option v-for="gender in genders" :key="gender" :value="gender">
              {{ gender | capitalize }}
            </option>
          </b-select>
        </div>
      </div>
      <b-field>
        <b-input v-model="user.email" placeholder="Email"></b-input>
      </b-field>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-primary is-right" @click="postUser">
            Submit new user
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from '~/services/ApiService'
import Filter from '~/mixins/filter'
import { mapActions } from 'vuex'

export default {
  mixins: [Filter],
  props: {
    sid: {
      type: String,
      default: ''
    },
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      user: {
        sid: this.sid,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: '',
        email: ''
      },
      loaded: false,
      isRegister: false,
      genders: ['male', 'female']
    }
  },
  computed: {
    fullName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
    isFetched() {
      return this.loaded && !this.isRegister
    }
  },
  watch: {
    user: {},
    'user.sid': function(val) {
      this.fetchUser(val)
    }
  },
  methods: {
    ...mapActions('sport', ['addUser']),
    add() {
      if (this.loaded && !this.isRegister) {
        this.addUser({
          sid: this.user.sid,
          firstName: this.user.firstName,
          lastName: this.user.lastName
        })
        // TODO: create check data has posted
        this.user.sid = ''
        this.user.firstName = ''
        this.user.lastName = ''
        this.user.gender = ''
        this.user.email = ''
        this.load = false
      }
    },
    async fetchUser(sid) {
      if (sid.length === 13) {
        const response = await ApiService.fetchUser(sid)
        this.loaded = true
        if (!response) {
          this.isRegister = true
        } else {
          this.isRegister = false
          this.user.firstName = response.firstName
          this.user.lastName = response.lastName
        }
      } else {
        this.loaded = false
        this.user.firstName = ''
        this.user.lastName = ''
      }
    },
    postUser() {
      ApiService.postUser(this.user).then(res => {
        this.isRegister = false
        this.user.firstName = res.firstName
        this.user.lastName = res.lastName
      })
    }
  }
}
</script>

<style></style>
