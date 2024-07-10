import express from 'express'
import AuthController from '../controller/AuthController.js'
import jwtAuth from '../middlewares/jwt_auth.js'

const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh-token', jwtAuth, AuthController.refreshToken)

export default router