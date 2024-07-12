import express from 'express'
import AuthController from '../controller/AuthController.js'
import FormController from '../controller/FormController.js'
import QuestionController from '../controller/QuestionController.js'
import jwtAuth from '../middlewares/jwt_auth.js'

const router = express.Router()

// Auth
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh-token', jwtAuth, AuthController.refreshToken)

// Form
router.get('/forms', jwtAuth, FormController.index)
router.post('/forms', jwtAuth, FormController.store)
router.get('/forms/:id', jwtAuth, FormController.show)
router.put('/forms/:id', jwtAuth, FormController.update)
router.delete('/forms/:id', jwtAuth, FormController.destroy)

// Question
router.post('/forms/:id/questions', jwtAuth, QuestionController.store)

export default router