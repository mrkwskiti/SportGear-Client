import { api, insertToken } from '../config/api'

export default {
  login: async (req, res, next) => {
    const { data, headers } = await api.post('/university/login', req.body)
    req.session.token = headers.authorization
    res.json(data)
  },
  logout: (req, res, next) => {
    req.session.destroy()
    res.json({ message: 'logged out' })
  },
  session: async (req, res, next) => {
    try {
      insertToken(req.session.token)
      const { data } = await api.get('/university')
      res.json(data)
    } catch {
      res.status(401).json({ message: 'session expired' })
    }
  },
  sid: async (req, res, next) => {
    insertToken(req.session.token)
    const { data } = await api.get('/university/sid')
    res.json(data)
  }
}
