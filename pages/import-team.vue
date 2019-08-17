<template>
  <div class="contrainer grid">
    <div class="field">
      <h2 class="title is-1">Import teams</h2>

      <div class="columns">
        <div class="column">
          <selection v-model="sport" @data="fetch" />
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <label class="label">Team</label>
          <team-table v-model="users" />
        </div>
      </div>

      <div v-if="isHidden">
        <div class="columns">
          <div class="column">
            <search-user :disabled="!canAddUser" @user="addUser" />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field class="buttons" grouped position="is-right">
          <b-button
            :disabled="!edited"
            class="is-primary is-right"
            @click="push"
          >
            Commit team
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
import Selection from '~/components/import-team/Selection'
import TeamTable from '~/components/import-team/TeamTable'
import SearchUser from '~/components/import-team/SearchUser'

export default {
  components: {
    Selection,
    TeamTable,
    SearchUser
  },
  middleware: 'authenticated',
  layout: 'register',
  data() {
    return {
      sport: null,
      users: null,
      edited: false
    }
  },
  computed: {
    isHidden() {
      return this.users
    },
    canAddUser() {
      return this.sport ? this.sport.eachTeam > this.users.length : false
    }
  },
  watch: {
    users() {
      this.edited = true
    }
  },
  methods: {
    async fetch(value) {
      const loadingComponent = this.$loading.open()
      this.users = value
        ? await this.$axios
            .get(
              `/services/university/sport/${value.sportId}/${value.team}/users`
            )
            .then(res => res.data)
        : []
      this.edited = await false
      loadingComponent.close()
    },
    addUser(user) {
      this.users.push(user)
    },
    async push() {
      if (this.edited) {
        const loadingComponent = this.$loading.open()
        try {
          await this.$axios.post(
            '/services/university/sport/users',
            this.users.map(user => user.id)
          )
          this.$notification.open({
            duration: 5000,
            message: `Commited team`,
            position: 'is-bottom-right',
            type: 'is-success',
            hasIcon: true
          })
        } catch (e) {
          this.$notification.open({
            duration: 5000,
            message: `Fail to commit team<br/>${e}<br/>Please try again`,
            position: 'is-bottom-right',
            type: 'is-danger',
            hasIcon: true
          })
        }
        loadingComponent.close()
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
