const data = require('~/data/sport')

const list = () => Object.keys(data)

const listCompetition = sport => Object.keys(data[sport].type)

const teams = (sport, competition) => data[sport].type[competition].teams

export default { list, listCompetition, teams }
