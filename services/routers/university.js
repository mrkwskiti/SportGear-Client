import express from 'express'
import controllers from '../controllers/controllers'

const router = express.Router()

router.get('/', controllers.university.session)

router.post('/login', controllers.university.login)

router.post('/logout', controllers.university.logout)

router.get('/sid', controllers.university.sid)

router.get('/users', controllers.university.users)

router.post('/users', controllers.university.addUsers)

export default router
