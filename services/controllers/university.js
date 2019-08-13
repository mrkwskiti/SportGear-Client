import { api } from '../config/api'

export default {
  login: async (req, res, next) => {
    const { data, headers } = await api.post('/university/login', req.body)
    req.session.token = headers.authorization
    res.json(data)
  },
  logout: async (req, res, next) => {
    await req.session.destroy()
    api.removeToken()
    res.json({ message: 'logged out' })
  },
  session: async (req, res, next) => {
    try {
      await api.setToken(req.session.token)
      console.log(api)
      const { data } = await api.get('/university')
      res.json(data)
    } catch {
      res.status(401).json({ message: 'session expired' })
    }
  },
  sid: async (req, res, next) => {
    // insertToken(req.session.token)
    api.setToken(req.session.token)
    const { data } = await api.get('/university/sid')
    res.json(data)
  }
}
