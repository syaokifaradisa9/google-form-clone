import express from 'express'
import AuthController from '../controller/AuthController.js'
import FormController from '../controller/FormController.js'
import jwtAuth from '../middlewares/jwt_auth.js'

const router = express.Router()

// Auth
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh-token', jwtAuth, AuthController.refreshToken)

// Form
router.post('/forms', jwtAuth, FormController.store)
router.get('/forms/:id', jwtAuth, FormController.show)
router.put('/forms/:id', jwtAuth, FormController.update)

export default router