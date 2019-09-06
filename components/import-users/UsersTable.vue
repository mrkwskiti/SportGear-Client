<template>
  <div>
    <hot-table
      ref="usersTable"
      class="hot handsontable htColumnHeaders"
      :settings="hotSettings"
    ></hot-table>
  </div>
</template>

<script>
import { HotTable, Handsontable } from '~/plugins/vue-handsontable'
import { isNumeric, isEmail } from 'validator'

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
      users: [], // old users
      all_users: [],
      delete_users: [],
      new_users: [],
      hotRef: null,
      hotSettings: {
        dataSchema: {
          id: null,
          sid: null,
          firstName: null,
          lastName: null,
          email: null,
          gender: null
        },
        // filtersKeyValue: true,
        colHeaders: [
          this.$t('ImportUser.UsersTable.SID'),
          this.$t('ImportUser.UsersTable.Firstname'),
          this.$t('ImportUser.UsersTable.Lastname'),
          this.$t('ImportUser.UsersTable.Gender'),
          this.$t('ImportUser.UsersTable.Email')
        ],
        columns: [
          {
            data: 'sid',
            validator: function(value, callback) {
              callback(
                isFilled(value)
                  ? duplicateValues(this, value) &&
                      isNumeric(value) &&
                      value.length === 13
                  : !isRowFilled(this)
              )
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
              callback(
                isFilled(value)
                  ? callback(duplicateValues(this, value) && isEmail(value))
                  : !isRowFilled(this)
              )
            }
          },
          {
            readOnly: true,
            renderer: function(
              instance,
              td,
              row,
              col,
              prop,
              value,
              cellProperties
            ) {
              Handsontable.default.renderers.TextRenderer.apply(this, arguments)
              td.innerHTML = '<button class="del">Delete</button>'
            }
          }
        ],
        cells: (row, columns, prop) => {
          const cellProperties = {}
          // set old users is read-only
          if (
            this.hotRef &&
            this.users.length - this.delete_users.length > row
          ) {
            // read-only old users
            const user = this.users.find(user => {
              return this.hotRef.getSourceDataAtRow(row).sid === user.sid
            })
            cellProperties.readOnly = !!user
          }
          return cellProperties
        },
        afterOnCellMouseDown: function(e, coords, TD) {
          if (coords.col === 5) {
            this.alter('remove_row', coords.row)
          }
        },
        beforeRemoveRow: (index, amount, physicalRows, source) => {
          this.hotRef.validateCells(valid => {
            this.$emit('isValid', valid)
            if (index < this.users.length - this.delete_users.length) {
              const user = this.hotRef.getSourceDataAtRow(index)
              this.delete_users.push(user)
            }
          })
        },
        beforeUndo: action => {
          if (action.actionType !== 'remove_row') {
            return
          }
          if (this.users.length - this.delete_users.length >= action.index) {
            this.delete_users = this.delete_users.filter(
              user => user.sid !== action.data[0][0]
            )
          }
        },
        afterChange: (change, source) => {
          console.log('change')
          if (this.hotRef) {
            this.hotRef.validateCells(valid => {
              // this.valid = valid
              this.$emit('isValid', valid)

              const update = this.hotRef.getSourceData()
              this.all_users = update

              // clear new users
              this.new_users = []
              // clean empty row
              for (
                let i = this.users.length - this.delete_users.length;
                i < update.length;
                i++
              ) {
                if (!this.hotRef.isEmptyRow(i)) this.new_users.push(update[i])
              }
              this.$emit('newUsers', this.new_users)
            })

            this.hotRef.updateSettings({
              height: this.hotRef.getData().length * 24 + 26
            })
          }
        },
        rowHeaders: true,
        stretchH: 'all',
        width: '100%',
        minSpareRows: 7,
        manualColumnMove: true,
        licenseKey: 'non-commercial-and-evaluation'
      }
    }
  },
  async mounted() {
    const loadingComponent = this.$loading.open()
    this.hotRef = await this.$refs.usersTable.hotInstance
    const { data } = await this.$axios.get('/services/university/users')
    this.users = [...data] // make duplicate users
    this.hotRef.loadData(data)
    loadingComponent.close()
  }
}
</script>
