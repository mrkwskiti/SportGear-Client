const data = require('~/data/universities')

const list = () => Object.values(data)

const keys = () => Object.keys(data)

const findKey = str => keys().find(key => data[key] === str)

export default {
  list,
  keys,
  findKey
}
