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
import 'handsontable-key-value'
import { isNumeric, isEmail } from 'validator'
import ApiServices from '~/services/ApiService'

const duplicateValues = (_this, value) => {
  const instance = _this.instance
  const vals = instance.getDataAtCol(_this.col)
  vals[_this.row] = ''

  return vals.indexOf(value) < 0 && value !== null
}

const isRowFilled = _this => {
  const vals = _this.instance.getDataAtRow(_this.row)
  vals[_this.col] = ''
  return vals.some(val => {
    return val !== null && val !== ''
  })
}

const isFilled = value => value !== null && value !== ''

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
        dataSchema: {
          sid: null,
          firstName: null,
          lastName: null,
          email: null,
          gender: null
        },
        // filtersKeyValue: true,
        colHeaders: ['SID', 'First Name', 'Last Name', 'Gender', 'E-mail'],
        columns: [
          {
            data: 'sid',
            validator: function(value, callback) {
              if (isFilled(value)) {
                callback(
                  duplicateValues(this, value) &&
                    isNumeric(value) &&
                    value.length === 13
                )
              } else {
                callback(!isRowFilled(this))
              }
            }
          },
          {
            data: 'firstName',
            validator: function(value, callback) {
              callback(isFilled(value) || !isRowFilled(this))
            }
          },
          {
            data: 'lastName',
            validator: function(value, callback) {
              callback(isFilled(value) || !isRowFilled(this))
            }
          },
          {
            type: 'key-value',
            data: 'gender',
            source: [
              {
                id: 1,
                name: 'Male'
              },
              {
                id: 2,
                name: 'Female'
              }
            ],
            keyProperty: 'id',
            valueProperty: 'name',
            validator: function(value, callback) {
              callback(isFilled(value) || !isRowFilled(this))
            }
          },
          {
            data: 'email',
            validator: function(value, callback) {
              if (isFilled(value)) {
                callback(duplicateValues(this, value) && isEmail(value))
              } else {
                callback(!isRowFilled(this))
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
        this.users = res
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
