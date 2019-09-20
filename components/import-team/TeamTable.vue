<template>
  <div>
    <b-table v-if="value" :data="value">
      <template slot-scope="props">
        <b-table-column
          field="sid"
          :label="$t('ImportTeam.TeamTable.SID')"
          width="120"
          sortable
        >
          {{ props.row.sid }}
        </b-table-column>

        <b-table-column
          field="firstName"
          :label="$t('ImportTeam.TeamTable.Firstname')"
          sortable
        >
          {{ props.row.firstName }}
        </b-table-column>

        <b-table-column
          field="lastName"
          :label="$t('ImportTeam.TeamTable.Lastname')"
          sortable
        >
          {{ props.row.lastName }}
        </b-table-column>

        <b-table-column>
          <b-tooltip
            label="Delete athlete"
            position="is-right"
            animated
            type="is-danger"
          >
            <b-button
              type="is-danger"
              size="is-small"
              style="border-radius: 9999px; width: 28px"
              @click="remove(props.row.id)"
            >
              <b-icon pack="fas" icon="times" size="is-small"></b-icon>
            </b-button>
          </b-tooltip>
        </b-table-column>
      </template>
    </b-table>
    <div v-else class="columns">
      <div class="column has-text-centered">
        {{ $t('ImportTeam.TeamTable.Selected') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: Array
  },
  methods: {
    remove(id) {
      this.$emit('input', this.value.filter(user => user.id !== id))
    }
  }
}
</script>

<style lang="scss" scoped></style>
