<template>
  <div class="vue-csv-uploader">
    <div class="form">
      <div class="vue-csv-uploader-part-one">
        <div
          v-if="headers === null"
          class="form-check form-group csv-import-checkbox"
        >
          <slot
            name="hasHeaders"
            :headers="hasHeaders"
            :toggle="toggleHasHeaders"
          >
            <input
              id="hasHeaders"
              :class="checkboxClass"
              type="checkbox"
              :value="hasHeaders"
              @change="toggleHasHeaders"
            />
            <label class="form-check-label" for="hasHeaders">
              File Has Headers
            </label>
          </slot>
        </div>
        <div class="form-group csv-import-file">
          <input ref="csv" type="file" :class="inputClass" name="csv" />
        </div>
        <div class="form-group">
          <slot name="next" :load="load">
            <input
              type="submit"
              :class="buttonClass"
              :value="loadBtnText"
              @click.prevent="load"
            />
          </slot>
        </div>
      </div>
      <div class="vue-csv-uploader-part-two">
        <div v-if="sample" class="vue-csv-mapping">
          <table :class="tableClass">
            <slot name="thead">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>CSV Column</th>
                </tr>
              </thead>
            </slot>
            <tbody>
              <tr v-for="(field, key) in fieldsToMap" :key="key">
                <td>{{ field.label }}</td>
                <td>
                  <select v-model="map[field.key]" class="form-control">
                    <option
                      v-for="(column, key) in firstRow"
                      :key="key"
                      :value="key"
                      >{{ column }}</option
                    >
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="url" class="form-group">
            <slot name="submit" :submit="submit">
              <input
                type="submit"
                :class="buttonClass"
                :value="submitBtnText"
                @click.prevent="submit"
              />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import Papa from 'papaparse'

export default {
  props: {
    value: Array,
    url: {
      type: String
    },
    mapFields: {
      required: true
    },
    callback: {
      type: Function,
      default: () => {}
    },
    catch: {
      type: Function,
      default: () => {}
    },
    finally: {
      type: Function,
      default: () => {}
    },
    parseConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    headers: {
      default: null
    },
    loadBtnText: {
      type: String,
      default: 'Next'
    },
    submitBtnText: {
      type: String,
      default: 'Submit'
    },
    tableClass: {
      type: String,
      default: 'table'
    },
    checkboxClass: {
      type: String,
      default: 'form-check-input'
    },
    buttonClass: {
      type: String,
      default: 'btn btn-primary'
    },
    inputClass: {
      type: String,
      default: 'form-control-file'
    }
  },

  data: () => ({
    form: {
      csv: null
    },
    fieldsToMap: [],
    map: {},
    hasHeaders: true,
    csv: null,
    sample: null
  }),
  computed: {
    firstRow() {
      return _.get(this, 'sample.0')
    }
  },
  watch: {
    map: {
      handler: function(newVal) {
        if (!this.url) {
          const hasAllKeys = this.mapFields.every(function(item) {
            return newVal.hasOwnProperty(item)
          })

          if (hasAllKeys) {
            this.submit()
          }
        }
      },
      deep: true
    }
  },

  created() {
    this.hasHeaders = this.headers

    if (_.isArray(this.mapFields)) {
      this.fieldsToMap = _.map(this.mapFields, item => {
        return {
          key: item,
          label: item
        }
      })
    } else {
      this.fieldsToMap = _.map(this.mapFields, (label, key) => {
        return {
          key: key,
          label: label
        }
      })
    }
  },

  methods: {
    submit() {
      const _this = this
      this.form.csv = this.buildMappedCsv()
      this.$emit('input', this.form.csv)

      if (this.url) {
        axios
          .post(this.url, this.form)
          .then(response => {
            _this.callback(response)
          })
          .catch(response => {
            _this.catch(response)
          })
          .finally(response => {
            _this.finally(response)
          })
      } else {
        _this.callback(this.form.csv)
      }
    },
    buildMappedCsv() {
      const _this = this

      const csv = this.hasHeaders ? _.drop(this.csv) : this.csv

      return _.map(csv, row => {
        const newRow = {}

        _.forEach(_this.map, (column, field) => {
          _.set(newRow, field, _.get(row, column))
        })

        return newRow
      })
    },
    load() {
      const _this = this

      this.readFile(output => {
        _this.sample = _.get(
          Papa.parse(output, { preview: 2, skipEmptyLines: true }),
          'data'
        )
        _this.csv = _.get(Papa.parse(output, { skipEmptyLines: true }), 'data')
      })
    },
    readFile(callback) {
      const file = this.$refs.csv.files[0]

      if (file) {
        const reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = function(evt) {
          callback(evt.target.result)
        }
        reader.onerror = function() {}
      }
    },
    toggleHasHeaders() {
      this.hasHeaders = !this.hasHeaders
    }
  }
}
</script>
