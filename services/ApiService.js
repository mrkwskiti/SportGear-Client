import axios from 'axios'
import Cookies from 'js-cookie'

const _api1 = '/api/v1'

const apiClient = axios.create({
  baseURL: `https://geargame30.eng.cmu.ac.th/api`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const insertToken = () => {
  const authToken = Cookies.get('auth')
  if (authToken !== undefined)
    apiClient.defaults.headers.common.Authorization = authToken
}

export default {
  loginUniver({ user, password }) {
    return apiClient
      .post(_api1 + '/university/login', { uni: user, pwd: password })
      .then(res => {
        console.log(res)
        // TODO: make it secure
        Cookies.set('auth', res.headers.authorization)
        return res.data
      })
  },
  getListSport() {
    insertToken()
    return apiClient.get(_api1 + '/sport/list/info').then(res => {
      console.log(res)
      return res.data
    })
  },
  fetchUser(sid) {
    insertToken()
    return apiClient
      .get(_api1 + '/users/info?sid=' + sid)
      .then(response => {
        console.log(response)
        return response.data[0]
      })
      .catch(error => {
        throw error.message
      })
  },
  async fetchUsers({ teamId, team }) {
    insertToken()
    const id = await apiClient.get(_api1 + '/sport/id', {
      params: {
        team_name: team,
        sport_id: teamId
      }
    })
    if (id.status === 200) {
      const users = await apiClient.get(_api1 + '/sport/list/teamBytype', {
        params: {
          // uni,
          type: teamId, // id 1001
          team_id: id.data.id // which team A or B
        }
      })
      return { ...id.data, users: users.data }
    }
  },
  postUser(user) {
    insertToken()
    return apiClient
      .post(_api1 + '/users', {
        sid: user.sid,
        // uni: user.uni,
        fname: user.firstName,
        lname: user.lastName,
        email: user.email,
        // TODO: find way to generate password
        password: '1234',
        gender: user.gender
      })
      .then(res => {
        return res.data
      })
  },
  // post users each team
  postUsers({ teamId, sportId, users }) {
    insertToken()
    return apiClient
      .post(_api1 + '/sport/list/addPlayer', {
        team_id: teamId,
        sport_id: sportId,
        account_id: users
      })
      .then(() => {
        // TODO: fix post up in database
      })
  },
  patchUsers({ teamId, sportId, users }) {
    insertToken()
    console.log(teamId + ' ' + sportId)
    console.log(users)
    return apiClient.post(_api1 + '/sport/list/patchPlayer', {
      team_id: teamId,
      sport_id: sportId,
      account_id: users
    })
  },
  postTeam({ team, sportId, uni }) {
    insertToken()
    return apiClient
      .post(_api1 + '/sport/list/addTeam', {
        team_name: team,
        sport_id: sportId
      })
      .then(res => {
        return res.data.id
      })
  },
  sidList() {
    insertToken()
    return apiClient.get(_api1 + '/university/sid').then(res => res.data)
  },
  fetchUsersInUni() {
    insertToken()
    return apiClient.get(_api1 + '/university/users/info').then(res => res.data)
  }
}
