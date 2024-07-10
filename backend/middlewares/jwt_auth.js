import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const jwtAuth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw { code: 401, message: 'UNAUTHORIZED' }
        }

        const token = req.headers.authorization.split(' ')[1] // Bearer <token>
        const verify = jwt.verify(token, env.ACCESS_TOKEN_SECRET)
        req.jwt = verify
        next()
    } catch (error) {
        if(error.message == "jwt expired"){
            error.message = 'ACCESS_TOKEN_IS_EXPIRED'
        }else if(["invalid signature", "jwt malformed", "jwt must be provided", "invalid token"].includes(error.message)){
            error.message = 'INVALID_ACCESS_TOKEN'
        }

        return res.status(error.code || 500)
            .json({
                status: false,
                message: error.message
            })
    }
}

export default jwtAuth