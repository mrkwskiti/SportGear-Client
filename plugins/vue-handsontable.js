// eslint-disable-next-line import/no-mutable-exports
let HotTable = null
if (process.client) {
  HotTable = require('@handsontable/vue').HotTable
  require('handsontable-key-value')
}
export default HotTable
