import axios from 'axios'

export default {
  setToken(token) {
    axios.defaults.headers.common.Authorization = token
    return axios.post('/session/token').then(res => res.data)
  }
}
