<template>
  <div>
    <hot-table
      ref="usersTable"
      class="hot handsontable htColumnHeaders"
      :settings="hotSettings"
      :data="users"
    ></hot-table>
  </div>
</template>

<script>
import HotTable from '~/plugins/vue-handsontable'
import ApiServices from '~/services/ApiService'

export default {
  components: {
    HotTable
  },
  data() {
    return {
      users: null,
      hotSettings: {
        minRows: 300,
        startCols: 4,
        colHeaders: ['SID', 'First Name', 'Last Name', 'E-mail'],
        rowHeaders: true,
        stretchH: 'all',
        height: '340',
        manualColumnMove: true,
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
  async mounted() {
    await this.fetchUsers()
    const instance = await this.$refs.usersTable.hotInstance
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < 4; j++) {
        instance.setCellMeta(i, j, 'readOnly', true)
      }
    }
  },
  methods: {
    fetchUsers() {
      return ApiServices.fetchUsersInUni().then(res => {
        this.users = res.map(user => {
          return [user.sid, user.firstName, user.lastName, user.email]
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
