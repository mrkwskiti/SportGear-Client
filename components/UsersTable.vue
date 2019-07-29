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
/* eslint-disable standard/no-callback-literal */
import HotTable from '~/plugins/vue-handsontable'
import { isNumeric, isEmail } from 'validator'
import ApiServices from '~/services/ApiService'

const duplicateValues = (_this, value) => {
  const instance = _this.instance
  const vals = instance.getDataAtCol(_this.col)
  vals[_this.row] = ''
  // console.log(vals.indexOf(value), vals)

  if (vals.indexOf(value) < 0 && value !== null) {
    console.log('You are OK')
    return true
  } else {
    console.log('I already have this value')
    return false
  }
}

const isRowFilled = _this => {
  const vals = _this.instance.getDataAtRow(_this.row)
  vals[_this.col] = ''
  return vals.some(val => {
    return val !== null && val !== ''
  })
}

export default {
  components: {
    HotTable
  },
  data() {
    return {
      users: null,
      update_users: [],
      hotRef: null,
      hotSettings: {
        // minRows: 300,
        startCols: 4,
        colHeaders: ['SID', 'First Name', 'Last Name', 'E-mail'],
        columns: [
          {
            validator: function(value, callback) {
              if (value !== null && value !== '') {
                callback(duplicateValues(this, value) && isNumeric(value))
              } else {
                callback(!isRowFilled(this))
              }
            }
          },
          {},
          {},
          {
            validator: function(value, callback) {
              if (value !== null && value !== '') {
                callback(duplicateValues(this, value) && isEmail(value))
              } else {
                callback(true)
              }
            }
          }
        ],
        afterChange: () => {
          if (this.hotRef) {
            this.hotRef.validateCells(valid => {
              // this.valid = valid
              this.$emit('isValid', valid)

              const update = this.hotRef.getSourceData()
              // clear new users
              this.update_users = []
              // clean empty row
              for (let i = this.users.length; i < update.length; i++) {
                if (!this.hotRef.isEmptyRow(i))
                  this.update_users.push(update[i])
              }
              this.$emit('updateUsers', this.update_users)
            })
          }
        },
        rowHeaders: true,
        stretchH: 'all',
        // height: '340',
        minSpareRows: 7,
        manualColumnMove: true,
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
  async mounted() {
    await this.fetchUsers()
    this.hotRef = await this.$refs.usersTable.hotInstance
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < 4; j++) {
        this.hotRef.setCellMeta(i, j, 'readOnly', true)
      }
    }
  },
  methods: {
    fetchUsers() {
      return ApiServices.fetchUsersInUni().then(res => {
        this.users = this.update_user = res.map(user => {
          return [user.sid, user.firstName, user.lastName, user.email]
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
