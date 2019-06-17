<template>
  <div>
    <b-field
      class="field is-expanded"
      :message="[!isRegister ? fullName : null]"
    >
      <div ref="name" class="field has-addons form-group--error">
        <b-input
          v-model="user.sid"
          type="number"
          min="13"
          max="13"
          expanded
          placeholder="SID"
          :loading="isLoading && isRegister"
          :disabled="isLoading"
          class="form-group--error"
        ></b-input>
        <p class="control">
          <a
            v-if="!isRegister"
            class="button is-primary"
            :disabled="!isFetched"
            :class="[isLoading ? 'is-loading' : null]"
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
              minlength="1"
              expanded
              placeholder="First Name"
              :disabled="isLoading"
            ></b-input>
          </div>
          <div class="field">
            <b-input
              v-model="user.lastName"
              minlength="1"
              expanded
              placeholder="Last Name"
              :disabled="isLoading"
            ></b-input>
          </div>
          <!-- <b-select v-model="user.gender" placeholder="Gender">
            <option v-for="gender in genders" :key="gender" :value="gender">
              {{ gender | capitalize }}
            </option>
          </b-select> -->

          <b-dropdown v-model="user.gender" hoverable aria-role="list">
            <button slot="trigger" class="button">
              <span v-if="user.gender === ''">gender</span>
              <span v-else>{{ user.gender }}</span>
              <b-icon
                pack="fas"
                icon="chevron-down"
                size="is-small"
                class="has-text-primary"
              ></b-icon>
            </button>

            <b-dropdown-item
              v-for="gender in genders"
              :key="gender"
              :value="gender"
              aria-role="listitem"
            >
              {{ gender }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <b-field>
        <b-input
          v-model="user.email"
          placeholder="Email"
          type="email"
          :disabled="isLoading"
        ></b-input>
      </b-field>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-primary is-right"
            :disabled="isValid"
            @click="postUser"
          >
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

import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [Filter],
  data() {
    return {
      user: {
        id: null,
        sid: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: ''
      },
      isLoading: false,
      loaded: false,
      isRegister: false,
      genders: ['male', 'female']
    }
  },
  validations: {
    user: {
      sid: {
        required,
        maxLength: maxLength(13)
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      gender: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  computed: {
    fullName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
    isFetched() {
      return this.loaded && !this.isRegister
    },
    isValid() {
      return this.$v.user.$invalid
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
          id: this.user.id,
          sid: this.user.sid,
          firstName: this.user.firstName,
          lastName: this.user.lastName
        })
        // TODO: create check data has posted
        this.user.id = null
        this.user.sid = ''
        this.$v.user.sid.$touch()
        this.user.firstName = ''
        this.user.lastName = ''
        this.user.gender = ''
        this.user.email = ''
        this.load = false
      }
    },

    async fetchUser(sid) {
      if (sid.length === 13) {
        this.isLoading = true
        const response = await ApiService.fetchUser(sid)
        this.loaded = true
        if (!response) {
          // no user in database
          this.isRegister = true
        } else {
          this.isRegister = false
          // replace on local
          this.user.id = response.id
          this.user.firstName = response.firstName
          this.user.lastName = response.lastName
        }
      } else {
        this.loaded = false
        this.user.id = null
        this.user.firstName = ''
        this.user.lastName = ''
      }
      this.isLoading = false
    },
    postUser() {
      if (!this.isValid) {
        ApiService.postUser(this.user).then(res => {
          this.isRegister = false
          this.user.id = res.id
          this.user.firstName = res.firstName
          this.user.lastName = res.lastName
        })
      }
    }
  }
}
</script>

<style></style>
