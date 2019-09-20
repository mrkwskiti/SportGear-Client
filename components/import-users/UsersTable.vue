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
import HotTable from '~/plugins/vue-handsontable'
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
      users: null,
      new_users: [],
      hotRef: null,
      hotSettings: {
        dataSchema: {
          sid: null,
          firstName: null,
          lastName: null,
          email: null,
          gender: null,
          details: {
            bloodType: null,
            allergicFoods: null,
            congenitaldisease: null,
            shirtSize: null,
            phoneNum: null
          }
        },
        // filtersKeyValue: true,
        colHeaders: [
          this.$t('ImportUser.UsersTable.SID'),
          this.$t('ImportUser.UsersTable.Firstname'),
          this.$t('ImportUser.UsersTable.Lastname'),
          this.$t('ImportUser.UsersTable.Gender'),
          this.$t('ImportUser.UsersTable.Email'),
          this.$t('ImportUser.UsersTable.bloodtype'),
          this.$t('ImportUser.UsersTable.allergicfood'),
          this.$t('ImportUser.UsersTable.congenitalDisease'),
          this.$t('ImportUser.UsersTable.shirtSize'),
          this.$t('ImportUser.UsersTable.phoneNum')
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
            type: 'key-value',
            data: 'bloodType',
            source: [
              {
                id: 1,
                name: 'A'
              },
              {
                id: 2,
                name: 'B'
              },
              {
                id: 3,
                name: 'AB'
              },
              {
                id: 4,
                name: 'O'
              }
            ],
            keyProperty: 'id',
            valueProperty: 'name',
            validator: function(value, callback) {
              callback(isFilled(value) || !isRowFilled(this))
            }
          },
          {
            data: 'allergicFoods'
          },
          {
            data: 'congenitaldisease'
          },
          {
            type: 'key-value',
            data: 'shirtSize',
            source: [
              {
                id: 1,
                name: 'SS'
              },
              {
                id: 2,
                name: 'S'
              },
              {
                id: 3,
                name: 'M'
              },
              {
                id: 4,
                name: 'L'
              },
              {
                id: 5,
                name: 'XL'
              },
              {
                id: 6,
                name: 'XXL'
              }
            ],
            keyProperty: 'id',
            valueProperty: 'name',
            validator: function(value, callback) {
              callback(isFilled(value) || !isRowFilled(this))
            }
          },
          {
            data: 'phoneNum',
            validator: function(value, callback) {
              callback(isFilled(value) || !isRowFilled(this))
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
              this.new_users = []
              // clean empty row
              for (let i = this.users.length; i < update.length; i++) {
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
    // set fetch old data to read-only
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < 5; j++) {
        this.hotRef.setCellMeta(i, j, 'readOnly', true)
      }
    }
    loadingComponent.close()
  }
}
</script>
