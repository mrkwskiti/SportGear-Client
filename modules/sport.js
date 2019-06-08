const data = require('~/data/sport')

const list = () => Object.keys(data)

const listTypeOfSport = sport => Object(data[sport].type)

export default { list, listTypeOfSport }
