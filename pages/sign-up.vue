<template>
  <div>
    <div class="contrainer grid">
      <div class="field">
        <h2 class="title is-1">Sign Up</h2>

        <div class="columns is-mobile">
          <div class="column is-narrow">
            <label class="label">Type of Sport</label>
            <div class="select">
              <select v-model="data.sport">
                <option v-for="sport in sports" :key="sport">
                  {{ sport }}
                </option>
              </select>
            </div>
          </div>

          <div v-if="competitions != ''" class="column is-narrow">
            <label class="label">Type of Competition</label>
            <div class="select">
              <select v-model="data.competition">
                <option
                  v-for="competition in competitions"
                  :key="competition"
                  >{{ competition }}</option
                >
              </select>
            </div>
          </div>

          <div v-if="teams" class="column">
            <label class="label">Team</label>
            <div class="select">
              <select v-model="data.team">
                <option v-for="n in teams" :key="n">{{
                  String.fromCharCode(64 + n)
                }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sport from '~/modules/sport'

export default {
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
