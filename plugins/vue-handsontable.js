/* eslint-disable import/no-mutable-exports */
let HotTable = null
let Handsontable = null
if (process.client) {
  HotTable = require('@handsontable/vue').HotTable
  require('handsontable-key-value')
  Handsontable = require('handsontable')
}
module.exports = { HotTable, Handsontable }
