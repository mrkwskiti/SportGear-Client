<template>
  <div>
    <div class="contrainer grid">
      <div class="field">
        <h2 class="title is-1">Sign Up</h2>
      </div>
      <div class="columns">
        <div class="column">
          <label class="label">SID</label>
          <input
            v-model="user.sid"
            type="text"
            class="input"
            placeholder="1234567890123"
          />
        </div>

        <div class="column is-narrow">
          <label class="label">University</label>
          <div class="select">
            <select v-model="user.university" :disabled="user.loaded">
              <option v-for="university in universities" :key="university">
                {{ university }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <label for="" class="label">First Name</label>
          <input
            v-model="user.firstName"
            type="text"
            class="input"
            :disabled="user.loaded"
          />
        </div>
        <div class="column">
          <label for="" class="label">Last Name</label>
          <input
            v-model="user.lastName"
            type="text"
            class="input"
            :disabled="user.loaded"
          />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <label class="label">Email</label>
          <input
            v-model="user.email"
            type="text"
            class="input"
            :disabled="user.loaded"
          />
        </div>
      </div>

      <div class="columns is-mobile">
        <div class="column is-narrow">
          <label class="label">Type of Sport</label>
          <div class="select">
            <select v-model="user.sport">
              <option v-for="sport in sports" :key="sport">{{ sport }}</option>
            </select>
          </div>
        </div>

        <div class="column">
          <label class="label">Team</label>
          <div class="select">
            <select>
              <option>A</option>
              <option>B</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Univers from '~/modules/university'
import Sport from '~/modules/sport'
import ApiService from '~/services/ApiService'

export default {
  data() {
    return {
      user: {
        sid: '',
        firstName: '',
        lastName: '',
        university: '',
        email: '',
        sport: '',
        loaded: false
      },
      universities: Univers.list(),
      sports: Sport.list()
    }
  },
  watch: {
    'user.sid': function(val) {
      this.fetchUser(val)
    }
  },
  methods: {
    async fetchUser(sid) {
      if (this.user.sid.length === 13) {
        const response = await ApiService.fetchUser(this.user.sid)
        this.user.firstName = response.firstName
        this.user.lastName = response.lastName
        this.user.university = response.university
        this.user.email = response.email
        this.user.loaded = true
      } else {
        this.user.loaded = false
      }
    }
  }
}
</script>

<style>
h2 {
  padding: 40px 0 40px;
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
