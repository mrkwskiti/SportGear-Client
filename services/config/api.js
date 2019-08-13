import axios from 'axios'

export const api = axios.create({
  baseURL: `https://geargame30.eng.cmu.ac.th/api/api/v1`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const insertToken = token => {
  if (token !== undefined) api.defaults.headers.common.Authorization = token
}
