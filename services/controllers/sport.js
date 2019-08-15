import { api } from '../config/api'

export default {
  list: async (req, res) => {
    try {
      api.setToken(req.session.token)
      const { data } = await api.get('/sport/list/info')
      res.json(data)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: e.message })
    }
  }
}
