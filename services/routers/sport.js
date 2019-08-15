import express from 'express'
import controllers from '../controllers/controllers'

const router = express.Router()

router.get('/', controllers.sport.list)

export default router
