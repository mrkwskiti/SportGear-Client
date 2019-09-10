<template>
  <div class="contrainer graid">
    <div class="field">
      <h2 class="title is-1">Import Staff</h2>
      <no-ssr>
        <staff-table>
          <!--  @isValid="isValid"
                @updateUsers="updateUsers"-->
        </staff-table>
      </no-ssr>
    </div>
    <div class="columns">
      <div class="column">
        <b-field class="buttons" grouped position="is-right">
          <b-button
            :disabled="!hasUpdate"
            class="is-primary is-right"
            @click="push"
          >
            Update Staff
          </b-button>
          <b-button tag="router-link" type="is-primary" outlined to="sign-up">
            Cancel
          </b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>
<script>
import StaffTable from '~/components/import-staff/StaffTable'
export default {
  components: {
    StaffTable
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
