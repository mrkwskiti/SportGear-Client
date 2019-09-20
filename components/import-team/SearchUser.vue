<template>
  <div>
    <b-field class="field is-expanded" :message="fullName">
      <div class="field has-addons">
        <b-autocomplete
          v-model="sid"
          expanded
          placeholder="SID"
          :disabled="disabled"
          :data="filteredUsers"
          field="sid"
          @typing="fetchUser"
          @select="user => (selected = user)"
          @keydown.native.enter="push"
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
              <div class="column is-hidden-mobile">
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
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    gender: {
      type: String,
      default: null
    },
    team: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      users: [],
      sid: '',
      selected: null
    }
  },
  computed: {
    diff() {
      return this.users.filter(user => {
        return !this.team.find(el => el.id === user.id)
      })
    },
    filteredUsers() {
      return this.diff.filter(user => {
        return user.sid.toString().indexOf(this.sid) >= 0
      })
    },
    fullName() {
      if (this.selected)
        return this.selected.firstName + '\t' + this.selected.lastName
      else return ' '
    }
  },
  watch: {
    gender() {
      this.fetchUsers()
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      this.users = await this.$axios
        .get('/services/university/users', { params: { gender: this.gender } })
        .then(res => res.data)
    },
    fetchUser() {
      if (this.sid.length === 12) {
        this.selected = this.filteredUsers[0]
      } else {
        this.selected = null
      }
    },
    push() {
      if (this.selected) {
        this.$emit('user', this.selected)
        // clear search
        this.sid = ''
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
