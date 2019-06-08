const data = require('~/data/sport')

const listSport = () => Object.keys(data)

const listTypeOfSport = sport => Object(data[sport].type)

module.exports = { listSport, listTypeOfSport }
