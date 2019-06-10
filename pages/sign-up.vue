<template>
  <div>
    <div class="contrainer grid">
      <div class="field">
        <h2 class="title is-1">Sign Up</h2>

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
              <option v-for="competition in competitions" :key="competition">
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

        <div class="columns">
          <div class="column">
            <label class="label">Team</label>
            <UserCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from '~/components/UserCard'
import Sport from '~/modules/sport'

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
    sports() {
      return Sport.list()
    },
    competitions() {
      if (this.data.sport) {
        return Sport.listCompetition(this.data.sport)
      } else return []
    },
    teams() {
      try {
        return Sport.teams(this.data.sport, this.data.competition)
      } catch {
        return 0
      }
    }
  },
  watch: {
    'data.sport': function(val) {
      this.data.competition = ''
    },
    'data.competition': function(val) {
      this.data.team = ''
    },
    'data.team': function(val) {
      if (val) this.fetch()
    }
  },
  methods: {
    fetch() {
      this.$store.dispatch('sport/fetchSport', {
        sport: this.data.sport,
        competition: this.data.competition,
        team: this.data.team
      })
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
