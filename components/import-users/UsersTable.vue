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
      users: [],
      hotRef: null,
      hotSettings: {
        dataSchema: {
          id: null,
          edited: null,
          sid: null,
          firstName: null,
          lastName: null,
          email: null,
          gender: null
        },
        // filtersKeyValue: true,
        colHeaders: [
          'id',
          'edited',
          this.$t('ImportUser.UsersTable.SID'),
          this.$t('ImportUser.UsersTable.Firstname'),
          this.$t('ImportUser.UsersTable.Lastname'),
          this.$t('ImportUser.UsersTable.Gender'),
          this.$t('ImportUser.UsersTable.Email'),
          ''
        ],
        hiddenColumns: {
          columns: [0, 1],
          indicators: false
        },
        columns: [
          {
            data: 'id'
          },
          {
            data: 'edited',
            type: 'checkbox'
          },
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
                  ? duplicateValues(this, value) && isEmail(value)
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
          if (this.hotRef && prop === 'sid') {
            // read-only old users
            cellProperties.readOnly = !!this.hotRef.getSourceDataAtRow(row).id
          }
          return cellProperties
        },
        afterOnCellMouseDown: function(e, coords, TD) {
          if (coords.col === 7) {
            this.alter('remove_row', coords.row)
          }
        },
        afterChange: (change, source) => {
          if (this.hotRef && change) {
            this.hotRef.validateCells(valid => {
              // this.valid = valid
              if (source !== 'UndoRedo.undo') {
                change.forEach(([row, prop, oldValue, newValue]) => {
                  const user = this.hotRef.getSourceDataAtRow(row)
                  if (!!user.id && !user.edited && prop !== 'edited')
                    this.hotRef.setDataAtRowProp(row, 'edited', true)
                })
              }
              this.$emit('isValid', valid)
              const users = this.hotRef.getSourceData()
              // debug
              this.users = users
              this.$emit(
                'newUsers',
                users.filter(user => !user.id && !!user.sid)
              )
            })
          }
        },
        afterUndo({ changes, actionType }) {
          // recursive if undo in edited prop

          if (actionType === 'change' && changes[0][1] === 'edited') {
            this.undo()
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
    this.hotRef.loadData(data)
    loadingComponent.close()
  }
}
</script>
