const data = require('~/data/sport')

const list = () => Object.keys(data)

const listCompetition = sport => Object.keys(data[sport].type)

const teams = (sport, competition) => data[sport].type[competition].teams

const eachTeam = (sport, competition) => data[sport].type[competition].eachTeam

export default { list, listCompetition, teams, eachTeam }
