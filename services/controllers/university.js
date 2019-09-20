import { api } from '../config/api'

export default {
  login: async (req, res, next) => {
    try {
      const { data, headers } = await api.post('/university/login', req.body)
      req.session.token = headers.authorization
      api.setToken(req.session.token)
      // init university var in session
      req.session.university = {}
      res.json(data)
    } catch (e) {
      res.status(401).json({ message: e.message })
    }
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
      const { data } = await api.get('/university/users/info', {
        params: req.query
      })
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
        params: req.params
      })
      // init university obj in session
      req.session.university.sport = req.params
      if (status === 200) {
        req.session.university.sport.team_id = data.id
        const users = await api.get('/sport/list/teamBytype', {
          params: {
            team_id: data.id,
            type: req.params.sport_id
          }
        })
        res.json(users.data)
      } else {
        res.json([])
      }
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  },
  addUsersInTeam: async (req, res, next) => {
    try {
      if (req.session.university.sport.team_id) {
        // patch
        await api.post('/sport/list/patchPlayer', {
          ...req.session.university.sport,
          account_id: req.body
        })
      } else {
        // posts
        const id = await api
          .post('/sport/list/addTeam', { ...req.session.university.sport })
          .then(res => res.data.id)
        await api.post('/sport/list/addPlayer', {
          team_id: id,
          sport_id: req.session.university.sport.sport_id,
          account_id: req.body
        })
      }
      res.json({ message: 'Add users in team complete' })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: e.message })
    }
  },
  changePassword: async (req, res, next) => {
    try {
      api.setToken(req.session.token)
      const { data } = await api.patch('/university/password')
      res.json()
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }
}
