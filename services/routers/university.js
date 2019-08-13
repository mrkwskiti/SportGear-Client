import express from 'express'
import controllers from '../controllers/controllers'

const router = express.Router()

router.get('/', controllers.university.session)

router.post('/login', controllers.university.login)

router.post('/logout', controllers.university.logout)

router.get('/sid', controllers.university.sid)

export default router
