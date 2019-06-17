import axios from 'axios'
import Cookies from 'js-cookie'

const _api1 = '/api/v1'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
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
    return apiClient
      .get('/users?sid=' + sid)
      .then(response => {
        return response.data[0]
      })
      .catch(error => {
        throw error.message
      })
  },
  fetchUsers({ uni, teamId, team }) {
    insertToken()
    return apiClient
      .get(_api1 + '/sport/list/teamBytype', {
        params: {
          uni,
          type: teamId, // id 1001
          team_id: team // which team A or B
        }
      })
      .then(res => {
        // TODO: debug
        console.log(res)
        return res.data
      })
  },
  postUser(user) {
    return apiClient.post('/users', user).then(res => {
      return res.data
    })
  },
  // post users each team
  postUsers(data) {
    return apiClient.post('/sports', data).then(() => {
      // TODO: fix post up in database
      console.log('posted')
    })
  },
  patchUsers({ id, users }) {
    return apiClient.patch('/sports/' + id, { users: users })
  }
}
