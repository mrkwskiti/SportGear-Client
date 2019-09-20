<template>
  <div>
    <b-field grouped group-multiline>
      <b-field :label="$t('ImportTeam.Selection.Type.sportType')">
        <b-dropdown v-model="data.sport" aria-role="list">
          <button slot="trigger" class="button">
            <span v-if="!data.sport">{{
              $t('ImportTeam.Selection.SportChoose')
            }}</span>
            <span v-else>{{ data.sport }}</span>
            <b-icon
              pack="fas"
              icon="chevron-down"
              size="is-small"
              class="has-text-primary"
            ></b-icon>
          </button>

          <b-dropdown-item
            v-for="sport in sportsList"
            :key="sport"
            :value="sport"
            aria-role="listitem"
          >
            {{ sport }}
          </b-dropdown-item>
        </b-dropdown>
      </b-field>

      <b-field :label="$t('ImportTeam.Selection.Type.CompeType')">
        <b-dropdown
          v-model="data.competition"
          :disabled="!data.sport"
          aria-role="list"
        >
          <button slot="trigger" class="button">
            <span v-if="!data.competition">
              {{ $t('ImportTeam.Selection.CompeChoose') }}
            </span>
            <span v-else>{{ data.competition }}</span>
            <b-icon
              pack="fas"
              icon="chevron-down"
              size="is-small"
              class="has-text-primary"
            ></b-icon>
          </button>

          <b-dropdown-item
            v-for="competition in competitionsList"
            :key="competition"
            :value="competition"
            aria-role="listitem"
          >
            {{ competition }}
          </b-dropdown-item>
        </b-dropdown>
      </b-field>

      <b-field :label="$t('ImportTeam.Selection.Type.Teams')">
        <b-dropdown
          v-model="data.team"
          :disabled="!data.competition"
          aria-role="list"
        >
          <button slot="trigger" class="button">
            <span v-if="!data.team">{{
              $t('ImportTeam.Selection.teamChoose')
            }}</span>
            <span v-else>{{ data.team }}</span>
            <b-icon
              pack="fas"
              icon="chevron-down"
              size="is-small"
              class="has-text-primary"
            ></b-icon>
          </button>

          <b-dropdown-item
            v-for="n in teams"
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
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      sports: null,
      data: {
        sport: null,
        competition: null,
        team: null
      }
    }
  },
  computed: {
    sportsList() {
      return this.sports ? Object.keys(this.sports) : []
    },
    competitionsList() {
      return this.data.sport
        ? Object.keys(this.sports[this.data.sport].type)
        : []
    },
    teams() {
      return this.data.sport && this.data.competition
        ? this.sports[this.data.sport].type[this.data.competition].teams
        : 0
    }
  },
  watch: {
    'data.sport': function() {
      this.data.competition = null
    },
    'data.competition': function() {
      this.data.team = null
    },
    'data.team': function() {
      this.$emit(
        'data',
        this.data.team
          ? { sportId: this.sportId(), team: this.data.team }
          : null
      )
      this.$emit(
        'input',
        this.sports[this.data.sport].type[this.data.competition]
      )
    }
  },
  async mounted() {
    const loadingComponent = this.$loading.open()
    this.sports = await this.$axios.get('/services/sport').then(res => res.data)
    loadingComponent.close()
  },
  methods: {
    convertIntToString(i) {
      return String.fromCharCode(64 + i)
    },
    sportId() {
      return this.sports[this.data.sport].type[this.data.competition]._id
    }
  }
}
</script>
