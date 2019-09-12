<template>
  <div class="contrainer graid">
    <div class="field">
      <h2 class="title is-1">Import Staff</h2>
      <no-ssr>
        <staff-table>
          <!--  @isValid="isValid"
                @updateUsers="updateUsers"-->
        </staff-table>
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
            Update Staff
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
import StaffTable from '~/components/import-staff/StaffTable'
export default {
  components: {
    StaffTable
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
    async push() {
      if (this.hasUpdate) {
        try {
          const loadingComponent = this.$loading.open()
          await this.$axios.post(
            '/services/university/users',
            this.update_users
          )
          this.$notification.open({
            duration: 5000,
            message: `Imported users`,
            position: 'is-bottom-right',
            type: 'is-success',
            hasIcon: true
          })
          loadingComponent.close()
          this.$router.push({ name: 'sign-up ' })
        } catch (e) {
          this.$notification.open({
            duration: 5000,
            message: `Import users fail</br>Please try again.`,
            position: 'is-bottom-right',
            type: 'is-danger',
            hasIcon: true
          })
        }
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
