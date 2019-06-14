import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  loginUniver(username, password) {
    // TODO: this here must to config in real server
    return apiClient.get('/univers', { username, password }).then(res => {
      return res.data[0]
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
