<template>
  <div>
    <div class="contrainer grid">
      <div class="field">
        <h2 class="title is-1">Import teams</h2>

        <div class="columns">
          <div class="column">
            <selection @data="fetch" />
          </div>
        </div>

        <!-- <div v-if="data.team != 0"> -->
        <div>
          <div class="columns">
            <div class="column">
              <label class="label">Team</label>
              <team-table :users="users" />
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <search-user @user="addUser" />
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <b-field grouped position="is-right">
                <b-button
                  :disabled="!edited"
                  class="is-primary is-right"
                  @click="push"
                >
                  Commit team
                </b-button>
              </b-field>
            </div>
          </div>
        </div>
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
      users: [],
      edited: false
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
      loadingComponent.close()
    },
    addUser(user) {
      this.hasEdit()
      this.users.push(user)
    },
    hasEdit() {
      this.edited = true
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
