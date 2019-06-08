<template>
  <div :class="{ 'box hero is-light': isRegister }">
    <div class="field">
      <p class="control has-icons-right">
        <input v-model="sid" class="input" type="text" placeholder="sid" />
        <span class="icon is-small is-right">
          <b-icon icon="check"></b-icon>
        </span>
      </p>
      <p v-if="!isRegister" class="help">
        {{ fullName }}
      </p>
    </div>
    <div v-if="isRegister">
      <div class="field is-grouped">
        <input
          type="text"
          class="input control is-expanded"
          placeholder="First Name"
        />
        <input
          type="text"
          class="input control is-expanded"
          placeholder="Last Name"
        />
      </div>
      <div class="field">
        <div class="control">
          <input type="text" class="input" placeholder="E-mail" />
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <a class="button is-primary is-right">
            Submit new user
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ApiService from '~/services/ApiService'

export default {
  data() {
    return {
      sid: '',
      firstName: 'Wasutan',
      lastName: 'Kitijerapat',
      isRegister: false
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}
</script>

<style></style>
