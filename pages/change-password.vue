<template>
  <div class="container grid">
    <div class="columns">
      <div class="column has-text-centered">
        <p class="title">Change password</p>
        <div class="columns">
          <div class="column">
            <section>
              <b-field>
                <!-- have to add v-model to password-->
                <b-input placeholder="old password" type="password"> </b-input>
              </b-field>
              <b-field>
                <!-- have to add v-model to password-->
                <b-input
                  placeholder="new password"
                  type="new password"
                ></b-input
              ></b-field>
              <b-button class="is-primary is-fullwidth">
                Submit new password
              </b-button>
              <b-button
                class="is-fullwidth"
                rounded
                type="is-light"
                style="margin-top : 10px"
                tag="router-link"
                to="/sign-up"
              >
                Cancle
              </b-button>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.title {
  margin-top: 60px;
}
</style>
