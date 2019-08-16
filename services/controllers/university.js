import { api } from '../config/api'

export default {
  login: async (req, res, next) => {
    const { data, headers } = await api.post('/university/login', req.body)
    req.session.token = headers.authorization
    api.setToken(req.session.token)
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
  },
  users: async (req, res, next) => {
    try {
      api.setToken(req.session.token)
      const { data } = await api.get('/university/users/info')
      res.json(data)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  },
  addUsers: async (req, res, next) => {
    try {
      const params = req.body.map(user => {
        return {
          sid: user.sid,
          fname: user.firstName,
          lname: user.lastName,
          email: user.email,
          password: '1234',
          gender: user.gender
        }
      })
      api.setToken(req.session.token)
      await api.post('/users', params)
      res.status(200).json({ message: 'Insert complete' })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  },
  fetchTeam: async (req, res, next) => {
    try {
      const { status, data } = await api.get('/sport/id', {
        params: {
          team_name: req.params.team,
          sport_id: req.params.id
        }
      })
      if (status === 200) {
        req.session.university = {
          team_id: data.id
        }
        const users = await api.get('/sport/list/teamBytype', {
          params: {
            type: req.params.id,
            team_id: data.id
          }
        })
        res.json({ users: users.data })
      } else {
        res.json({ users: [] })
      }
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
