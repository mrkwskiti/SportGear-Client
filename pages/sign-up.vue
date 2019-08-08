<template>
  <div>
    <div class="contrainer grid">
      <div class="field">
        <h2 class="title is-1">Sign Up</h2>

        <div class="columns">
          <div class="column">
            <b-button class="is-fullwidth" tag="router-link" to="/import-users">
              Import athletes
            </b-button>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-field grouped group-multiline>
              <b-field label="Type of Sport">
                <b-dropdown v-model="data.sport" aria-role="list">
                  <button slot="trigger" class="button">
                    <span v-if="data.sport == ''">choose sport</span>
                    <span v-else>{{ data.sport }}</span>
                    <b-icon
                      pack="fas"
                      icon="chevron-down"
                      size="is-small"
                      class="has-text-primary"
                    ></b-icon>
                  </button>

                  <b-dropdown-item
                    v-for="sport in sports"
                    :key="sport"
                    :value="sport"
                    aria-role="listitem"
                  >
                    {{ sport }}
                  </b-dropdown-item>
                </b-dropdown>
              </b-field>

              <b-field label="Type of Competition">
                <b-dropdown
                  v-model="data.competition"
                  :disabled="data.sport === ''"
                  aria-role="list"
                >
                  <button slot="trigger" class="button">
                    <span v-if="data.competition == ''"
                      >choose competition</span
                    >
                    <span v-else>{{ data.competition }}</span>
                    <b-icon
                      pack="fas"
                      icon="chevron-down"
                      size="is-small"
                      class="has-text-primary"
                    ></b-icon>
                  </button>

                  <b-dropdown-item
                    v-for="competition in competitions(data.sport)"
                    :key="competition"
                    :value="competition"
                    aria-role="listitem"
                  >
                    {{ competition }}
                  </b-dropdown-item>
                </b-dropdown>
              </b-field>

              <b-field label="Teams">
                <b-dropdown
                  v-model="data.team"
                  :disabled="data.competition === ''"
                  aria-role="list"
                >
                  <button slot="trigger" class="button">
                    <span v-if="data.team == ''">choose team</span>
                    <span v-else>{{ data.team }}</span>
                    <b-icon
                      pack="fas"
                      icon="chevron-down"
                      size="is-small"
                      class="has-text-primary"
                    ></b-icon>
                  </button>

                  <b-dropdown-item
                    v-for="n in teams(data.sport, data.competition)"
                    :key="n"
                    :value="convertIntToString(n)"
                    aria-role="listitem"
                  >
                    {{ convertIntToString(n) }}
                  </b-dropdown-item>
                </b-dropdown>
              </b-field>
            </b-field>
          </div>
        </div>

        <div v-if="data.team != 0">
          <div class="columns">
            <div class="column">
              <label class="label">Team</label>

              <b-table :data="sport.users">
                <template slot-scope="props">
                  <b-table-column field="sid" label="SID" width="120" sortable>
                    {{ props.row.sid }}
                  </b-table-column>

                  <b-table-column field="firstName" label="First Name" sortable>
                    {{ props.row.firstName }}
                  </b-table-column>

                  <b-table-column field="lastName" label="Last Name" sortable>
                    {{ props.row.lastName }}
                  </b-table-column>

                  <b-table-column>
                    <b-button
                      type="is-danger"
                      size="is-small"
                      style="border-radius: 9999px; width: 28px"
                      @click="remove(props.row.id)"
                    >
                      <b-icon pack="fas" icon="times" size="is-small"></b-icon>
                    </b-button>
                  </b-table-column>
                </template>
              </b-table>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <UserCard
                v-if="
                  eachTeam(data.sport, data.competition) > sport.users.length
                "
              />
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <b-field grouped position="is-right">
                <b-button
                  :disabled="!sport.edited"
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
import { mapActions, mapState, mapGetters } from 'vuex'
import UserCard from '~/components/UserCard'
// import Sport from '~/modules/sport'

export default {
  components: {
    UserCard
  },
  middleware: 'authenticated',
  layout: 'register',
  data() {
    return {
      data: {
        sport: '',
        competition: '',
        team: ''
      }
    }
  },
  computed: {
    ...mapState(['sport']),
    ...mapGetters({
      uni: 'login/uniLogged',
      sports: 'sport/sportList',
      competitions: 'sport/competitionList',
      teams: 'sport/teams',
      eachTeam: 'sport/eachTeam'
    })
  },
  watch: {
    'data.sport': function(val) {
      this.data.competition = ''
      this.reset()
    },
    'data.competition': function(val) {
      this.data.team = ''
      this.reset()
    },
    'data.team': function(val) {
      if (val) this.fetch()
    }
  },
  fetch({ store }) {
    store.dispatch('login/fetchUsers')
    store.dispatch('login/fetchSid')
  },
  beforeCreate() {
    this.$store.dispatch('sport/getListSport')
  },
  methods: {
    ...mapActions('sport', [
      'fetchSport',
      'resetUsers',
      'patchUsers',
      'postUsers',
      'removeUser',
      'postTeam'
    ]),
    convertIntToString(i) {
      return String.fromCharCode(64 + i)
    },
    fetch() {
      const loadingComponent = this.$loading.open()
      this.fetchSport({
        sport: this.data.sport,
        competition: this.data.competition,
        team: this.data.team
      })
        .then(() => {
          console.log('fetch')
        })
        .catch(err => {
          // TODO: create err component
          console.log(err.message)
        })
        .finally(() => {
          loadingComponent.close()
        })
    },
    reset() {
      this.resetUsers()
    },
    push() {
      if (this.sport.edited) {
        const loadingComponent = this.$loading.open()
        // post
        if (this.sport.id === null) {
          this.postTeam({ ...this.data, uni: this.uni }).then(() => {
            loadingComponent.close()
            this.$notification.open({
              duration: 5000,
              message: `Commited team`,
              position: 'is-bottom-right',
              type: 'is-success',
              hasIcon: true
            })
          })
        }
        // patch
        else {
          this.patchUsers(this.data).then(() => {
            loadingComponent.close()
            this.$notification.open({
              duration: 5000,
              message: `Commited team`,
              position: 'is-bottom-right',
              type: 'is-success',
              hasIcon: true
            })
          })
        }
        this.$router.push({ name: 'log-in' })
      }
    },
    remove(id) {
      this.removeUser(id)
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
