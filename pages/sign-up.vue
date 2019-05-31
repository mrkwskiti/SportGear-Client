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
              <option>Chiang mai university</option>
              <option>Chulalongkorn university</option>
              <option>Thammasat university</option>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        sid: '',
        firstName: '',
        lastName: '',
        university: '',
        email: '',
        loaded: false
      }
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
        const response = await this.$axios.$get(
          'http://localhost:3000/users?sid=' + sid
        )
        console.log(response)
        console.log(response[0].firstName)
        this.user.firstName = response[0].firstName
        this.user.lastName = response[0].lastName
        this.user.university = response[0].university
        this.user.email = response[0].email
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
  padding: 20px 0 20px;
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
