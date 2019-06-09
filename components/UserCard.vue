<template>
  <div :class="{ 'box hero is-light': isRegister }">
    <b-field :message="[!isRegister ? fullName : null]">
      <b-input v-model="sid" expanded placeholder="SID"></b-input>
    </b-field>

    <section v-if="isRegister">
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <b-input expanded placeholder="First Name"></b-input>
          </div>
          <div class="field">
            <b-input expanded placeholder="Last Name"></b-input>
          </div>
          <b-select placeholder="Gender">
            <option>Male</option>
            <option>Female</option>
          </b-select>
        </div>
      </div>
      <b-field>
        <b-input placeholder="Email"></b-input>
      </b-field>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <a class="button is-primary is-right">
            Submit new user
          </a>
        </div>
      </div>
    </section>
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
