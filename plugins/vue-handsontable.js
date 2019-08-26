/* eslint-disable import/no-mutable-exports */
let HotTable = null
let getSourceItem = null
if (process.client) {
  HotTable = require('@handsontable/vue').HotTable
  require('handsontable-key-value')

  getSourceItem = require('handsontable-key-value/es/common').getSourceItem
}
export { HotTable, getSourceItem }
