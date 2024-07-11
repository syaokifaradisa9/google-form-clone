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

    async show(req, res){
        try{  
            if(!req.params.id){
                throw { code: 400, message: 'FORM_ID_IS_REQUIRED' }
            }

            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw { code: 400, message: 'INVALID_FORM_ID' }
            }
            
            const form = await Form.findOne({
                _id: req.params.id,
                userId: req.jwt.id
            })

            if(!form){
                throw { code: 404, message: 'FORM_NOT_FOUND' }
            }

            return res.status(200).json({
                status: true,
                message: 'FORM_FOUND',
                data: form
            })
        }catch(error){
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            })
        }
    }

    async update(req, res){
        try{
            if(!req.params.id){
                throw { code: 400, message: 'FORM_ID_IS_REQUIRED' }
            }

            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                throw { code: 400, message: 'INVALID_FORM_ID' }
            }

            const form = await Form.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.jwt.id
                },
                req.body,
                {
                    new: true
                }
            )

            if(!form){
                throw { code: 404, message: 'FORM_UPDATE_FAILED' }
            }  

            return res.status(200).json({
                status: true,
                message: 'FORM_UPDATED',
                data: form
            })
        }catch(error){
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            })
        }
    }

    async destroy(req, res){
        try{
            if(!req.params.id){
                throw { code: 400, message: 'FORM_ID_IS_REQUIRED' }
            }

            const form = await Form.findOneAndDelete({
                _id: req.params.id,
                userId: req.jwt.id
            })

            if(!form){
                throw { code: 404, message: 'FORM_DELETE_FAILED' }
            }

            return res.status(200).json({
                status: true,
                message: 'FORM_DELETED',
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