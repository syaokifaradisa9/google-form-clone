import express from 'express'
import AuthController from '../controller/AuthController.js'
import FormController from '../controller/FormController.js'
import QuestionController from '../controller/QuestionController.js'
import OptionController from '../controller/OptionController.js'
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
router.get('/forms/:id/questions', jwtAuth, QuestionController.index)
router.post('/forms/:id/questions', jwtAuth, QuestionController.store)
router.put('/forms/:id/questions/:questionId', jwtAuth, QuestionController.update)
router.delete('/forms/:id/questions/:questionId', jwtAuth, QuestionController.destroy)

// Option
router.post('/forms/:id/questions/:questionId/options', jwtAuth, OptionController.store)
router.delete('/forms/:id/questions/:questionId/options/:optionId', jwtAuth, OptionController.destroy)

export default router