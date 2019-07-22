<template>
  <div class="contrainer grid">
    <div class="field">
      <h2 class="title is-1">Import users</h2>
      <users-table></users-table>
    </div>
  </div>
</template>

<script>
import UsersTable from '~/components/UsersTable'

export default {
  components: {
    UsersTable
  },
  data: function() {
    return {
      // data: [
      //   ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
      //   ['2019', 10, 11, 12, 13],
      //   ['2020', 20, 11, 14, 13],
      //   ['2021', 30, 15, 12, 13]
      // ]
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
