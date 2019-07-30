<template>
  <div class="contrainer grid">
    <div class="field">
      <h2 class="title is-1">Import athletes</h2>
      <no-ssr>
        <users-table
          @isValid="isValid"
          @updateUsers="updateUsers"
        ></users-table>
      </no-ssr>
    </div>
    <div class="columns">
      <div class="column">
        <b-field class="buttons" grouped position="is-right">
          <b-button
            :disabled="!hasUpdate"
            class="is-primary is-right"
            @click="push"
          >
            Update athletes
          </b-button>
          <b-button tag="router-link" type="is-primary" outlined to="sign-up">
            Cancel
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
    async push() {
      if (this.hasUpdate) {
        const promises = this.update_users.map(async user => {
          await ApiServices.postUser({
            sid: user[0],
            firstName: user[1],
            lastName: user[2],
            email: user[3]
          })
        })

        await Promise.all(promises)
        this.$notification.open({
          duration: 5000,
          message: `Imported users`,
          position: 'is-bottom-right',
          type: 'is-success',
          hasIcon: true
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
