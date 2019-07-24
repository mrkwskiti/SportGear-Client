<template>
  <div class="contrainer grid">
    <div class="field">
      <h2 class="title is-1">Import users</h2>
      <users-table @isValid="isValid" @updateUsers="updateUsers"></users-table>
    </div>
    <div class="columns">
      <div class="column">
        <b-field grouped position="is-right">
          <b-button
            :disabled="!hasUpdate"
            class="is-primary is-right"
            @click="push"
          >
            Update users
          </b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from '~/components/UsersTable'
import ApiServices from '~/services/ApiService'

export default {
  components: {
    UsersTable
  },
  layout: 'register',
  middleware: 'authenticated',
  data: function() {
    return {
      valid: true,
      update_users: []
    }
  },
  computed: {
    hasUpdate() {
      return this.valid && this.update_users.length !== 0
    }
  },
  methods: {
    isValid(value) {
      this.valid = value
    },
    updateUsers(value) {
      this.update_users = value
    },
    push() {
      if (this.hasUpdate) {
        // TODO: push new users
        this.update_users.forEach(user => {
          ApiServices.postUser({
            sid: user[0],
            firstName: user[1],
            lastName: user[2],
            email: user[3]
          })
        })
        this.$router.push({ name: 'sign-up' })
      }
    }
  }
}
</script>

<style>
h2 {
  padding: 60px 0 0 0;
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
