import '../models/User.js'
import User from '../models/User.js'
import emailExists from '../libraries/email_exists.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const generateAccessToken = async (payload) => {
    return jwt.sign(
        payload,
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: env.ACCESS_TOKEN_EXPIRATION_TIME }
    )
}

const generateRefreshToken = async (payload) => {
    return jwt.sign(
        payload,
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: env.REFRESH_TOKEN_EXPIRATION_TIME }
    )
}

class AuthController{
    async register(req, res){
        try{
            if(!req.body.fullname){
                throw { code: 400, message: 'FULLNAME_IS_REQUIRED' }
            }

            if(!req.body.email){
                throw { code: 400, message: 'EMAIL_IS_REQUIRED' }
            }

            if(!req.body.password){
                throw { code: 400, message: 'PASSWORD_IS_REQUIRED' }
            }

            if(req.body.password.length < 6){
                throw { code: 400, message: 'PASSWORD_IS_TOO_SHORT' }
            }

            const isEmailExists = await emailExists(req.body.email)
            if(isEmailExists){
                throw { code : 400, message: 'EMAIL_ALREADY_EXISTS' }
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            const user = await User.create({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashedPassword
            })

            if(!user){
                throw { code: 500, message: 'USER_REGISTER_FAILED' }
            }

            return res.status(200)
                .json({
                    status: true,
                    message: 'USER_REGISTERED',
                    user
                })
        }catch(error){
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        } 
    }

    async login(req, res){
        try{
            if(!req.body.email){
                throw { code: 400, message: 'EMAIL_IS_REQUIRED' }
            }

            if(!req.body.password){
                throw { code: 400, message: 'PASSWORD_IS_REQUIRED' }
            }

            const user = await User.findOne({ email: req.body.email })
            if(!user){
                throw { code: 404, message: 'USER_NOT_FOUND' }
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch){
                throw { code: 400, message: 'PASSWORD_IS_INCORRECT' }
            }

            let payload = { id: user._id }
            const accessToken = await generateAccessToken(payload)
            const refreshToken = await generateRefreshToken(payload)

            return res.status(200)
                .json({
                    status: true,
                    message: 'USER_LOGGED_IN',
                    fullname: user.fullname,
                    accessToken,
                    refreshToken
                })
        }catch(error){
            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }

    async refreshToken(req, res){
        try{
            if(!req.body.refreshToken){
                throw { code: 400, message: 'REFRESH_TOKEN_IS_REQUIRED' }
            }

            const verify = await jwt.verify(req.body.refreshToken, env.REFRESH_TOKEN_SECRET)
            let payload = { id: verify.id }

            const accessToken = await generateAccessToken(payload)
            const refreshToken = await generateRefreshToken(payload)

            return res.status(200)
                .json({
                    status: true,
                    message: 'REFRESH_TOKEN_GENERATED',
                    accessToken,
                    refreshToken
                })
        }catch(error){
            if(error.message == "jwt expired"){
                error.message = 'REFRESH_TOKEN_IS_EXPIRED'
            }else if(["invalid signature", "jwt malformed", "jwt must be provided", "invalid token"].includes(error.message)){
                error.message = 'INVALID_REFRESH_TOKEN'
            }

            return res.status(error.code || 500)
                .json({
                    status: false,
                    message: error.message
                })
        }
    }
}

export default new AuthController()