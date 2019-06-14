<template>
  <div>
    <div class="contrainer grid">
      <div class="field">
        <h2 class="title is-1">Sign Up</h2>

        <div class="columns">
          <div class="column">
            <b-field grouped group-multiline>
              <b-field label="Type of Sport">
                <b-select v-model="data.sport">
                  <option v-for="sport in sports" :key="sport">
                    {{ sport }}
                  </option>
                </b-select>
              </b-field>

              <b-field v-if="competitions != ''" label="Type of Competition">
                <b-select v-model="data.competition">
                  <option
                    v-for="competition in competitions"
                    :key="competition"
                  >
                    {{ competition }}
                  </option>
                </b-select>
              </b-field>

              <b-field v-if="teams" label="Teams">
                <b-select v-model="data.team">
                  <option v-for="n in teams" :key="n">
                    {{ String.fromCharCode(64 + n) }}
                  </option>
                </b-select>
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
                      style="border-radius: 9999px;"
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
              <UserCard v-if="eachTeam > sport.users.length" />
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
import UserCard from '~/components/UserCard'
import Sport from '~/modules/sport'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    UserCard
  },
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
    sports() {
      return Sport.list()
    },
    competitions() {
      if (this.data.sport) {
        return Sport.listCompetition(this.data.sport)
      } else return []
    },
    teams() {
      if (this.data.competition)
        return Sport.teams(this.data.sport, this.data.competition)
      else return 0
    },
    eachTeam() {
      if (this.data.competition)
        return Sport.eachTeam(this.data.sport, this.data.competition)
      else return 0
    }
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
  methods: {
    ...mapActions('sport', [
      'fetchSport',
      'resetUsers',
      'patchUsers',
      'postUsers',
      'removeUser'
    ]),
    fetch() {
      this.fetchSport({
        sport: this.data.sport,
        competition: this.data.competition,
        team: this.data.team
      })
    },
    reset() {
      this.resetUsers()
    },
    push() {
      if (this.sport.edited) {
        // post
        if (this.sport.id === 0) this.postUsers(this.data)
        // patch
        else this.patchUsers()
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
