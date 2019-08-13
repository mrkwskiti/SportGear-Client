const axios = require('axios')

export const api = axios.create({
  baseURL: `https://geargame30.eng.cmu.ac.th/api/api/v1`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

api.setToken = token => {
  if (token !== undefined) api.defaults.headers.common.Authorization = token
}

api.removeToken = () => {
  if (api.defaults.headers.common.Authorization !== undefined)
    delete api.defaults.headers.common.Authorization
}

// export const insertToken = token => {
//   if (token !== undefined) api.defaults.headers.common.Authorization = token
// }
