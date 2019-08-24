import express from 'express'

// import university from './routers/university'
import routers from './routers'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// routers to /session/university
router.use('/university', routers.university)
router.use('/sport', routers.sport)

// Export the server middleware
export default {
  path: '/services',
  handler: router
}
