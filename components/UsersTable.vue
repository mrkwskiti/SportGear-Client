<template>
  <div>
    <hot-table
      class="hot handsontable htColumnHeaders"
      :settings="hotSettings"
    ></hot-table>
  </div>
</template>

<script>
import HotTable from '~/plugins/vue-handsontable'
export default {
  components: {
    HotTable
  },
  data() {
    return {
      hotSettings: {
        startRows: 300,
        startCols: 4,
        colHeaders: ['SID', 'First Name', 'Last Name', 'E-mail'],
        rowHeaders: true,
        stretchH: 'all',
        height: '340',
        manualColumnMove: true,
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
