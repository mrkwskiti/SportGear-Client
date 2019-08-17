<template>
  <div>
    <b-field class="field is-expanded" :message="fullName">
      <div class="field has-addons">
        <b-autocomplete
          v-model="sid"
          expanded
          placeholder="SID"
          :data="filteredUsers"
          field="sid"
          @select="user => (selected = user)"
        >
          <template slot-scope="props">
            <div class="columns">
              <div class="column is-half-tablet is-one-third-desktop">
                {{ props.option.sid }}
                <br />
                <small class="is-hidden-tablet">
                  {{ props.option.firstName }}
                  &#09;
                  {{ props.option.lastName }}
                </small>
              </div>
              <div class="column">
                {{ props.option.firstName }}
                &#09;
                {{ props.option.lastName }}
              </div>
            </div>
          </template>
        </b-autocomplete>
        <p class="control">
          <a class="button is-primary" :disabled="!selected" @click="push">
            Add user
          </a>
        </p>
      </div>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      sid: '',
      selected: null
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.sid.toString().indexOf(this.sid) >= 0
      })
    },
    fullName() {
      if (this.selected)
        return this.selected.firstName + '\t' + this.selected.lastName
      else return ' '
    }
  },
  async mounted() {
    this.users = await this.$axios
      .get('/services/university/users')
      .then(res => res.data)
  },
  methods: {
    push() {
      if (this.selected) {
        this.$emit('user', this.selected)
      }
    }
  }
}
</script>

<style>
.help {
  padding-left: 17px;
}
</style>
