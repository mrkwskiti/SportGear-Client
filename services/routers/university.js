import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.get('/', controllers.university.session)

router.post('/login', controllers.university.login)

router.post('/logout', controllers.university.logout)

router.get('/sid', controllers.university.sid)

router.get('/users', controllers.university.users)

router.post('/users', controllers.university.addUsers)

router.patch('/users', controllers.university.updateUsers)

router.post('/users/delete', controllers.university.deleteUsers)

router.patch('/password', controllers.university.changePassword)

router.get(
  '/sport/:sport_id/:team_name/users',
  controllers.university.fetchTeam
)

router.post('/sport/users', controllers.university.addUsersInTeam)

export default router
