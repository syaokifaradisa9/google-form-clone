import express from 'express'
import AuthController from '../controller/AuthController.js'

const router = express.Router()

router.post('/register', AuthController.register)

export default router