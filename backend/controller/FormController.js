import mongoose from 'mongoose'
import Form from '../models/Form.js'

class FormController{
    async store(req, res){
        try{
            const form = await Form.create({
                userId: req.jwt.id,
                title: 'Untitled Form',
                description: null,
                public: true
            })

            if(!form){
                throw { code: 500, message: 'FAILED_TO_CREATE_FORM' }
            }

            return res.status(201).json({
                status: true,
                message: 'FORM_CREATED',
                data: form
            })
        }catch(error){
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            })
        }
    }
}

export default new FormController()