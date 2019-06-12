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
  login(username, password) {
    // TODO: real server /user/login
    return apiClient.post('/login', { username, password }).then(res => {
      console.log(res.data.id)
      return res.data
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
