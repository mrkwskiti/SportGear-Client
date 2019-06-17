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
  fetchUsers(sport, competition, team) {
    return apiClient.get('/sports', {
      params: {
        sport,
        competition,
        team
      }
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
