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
        console.log(response)
        return response.data[0]
      })
      .catch(error => {
        throw error.message
      })
  }
}
