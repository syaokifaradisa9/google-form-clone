import Form from '../models/Form.js'
import mongoose from 'mongoose'

class OptionController{
    async store(req, res){
        try {
            if(!req.params.id) {
                throw { code: 400, message: 'FORM_ID_IS_REQUIRED' }
            }

            if(!req.params.questionId) {
                throw { code: 400, message: 'QUESTION_ID_IS_REQUIRED' }
            }

            if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
                throw { code: 400, message: 'INVALID_FORM_ID' }
            }

            if(!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
                throw { code: 400, message: 'INVALID_QUESTION_ID' }
            }

            if(!req.body.option) {
                throw { code: 400, message: 'OPTION_IS_REQUIRED' }
            }

            const option = {
                id: new mongoose.Types.ObjectId(),
                value: req.body.option
            }

            const form = await Form.findOneAndUpdate(
                { _id: req.params.id, userId: req.jwt.id },
                { $push: { 'questions.$[indexQuestion].options': option } },
                { new: true, arrayFilters: [ { 'indexQuestion.id': mongoose.Types.ObjectId.createFromHexString(req.params.questionId) } ] }
            )

            if(!form) {
                throw { code: 404, message: 'OPTION_CREATE_FAILED' }
            }

            return res.status(200).json({
                status: true,
                message: 'OPTION_CREATED',
                data: option
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            })
        }
    }

    async destroy(req, res){
        try {
            if(!req.params.id) {
                throw { code: 400, message: 'FORM_ID_IS_REQUIRED' }
            }

            if(!req.params.questionId) {
                throw { code: 400, message: 'QUESTION_ID_IS_REQUIRED' }
            }

            if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
                throw { code: 400, message: 'INVALID_FORM_ID' }
            }

            if(!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
                throw { code: 400, message: 'INVALID_QUESTION_ID' }
            }

            if(!mongoose.Types.ObjectId.isValid(req.params.optionId)) {
                throw { code: 400, message: 'INVALID_OPTION_ID' }
            }

            const form = await Form.findOneAndUpdate(
                { _id: req.params.id, userId: req.jwt.id },
                {
                    $pull: {
                        'questions.$[indexQuestion].options': {
                            id: mongoose.Types.ObjectId.createFromHexString(req.params.optionId)
                        }
                    } 
                },
                {
                    new: true,
                    arrayFilters: [
                        { 'indexQuestion.id': mongoose.Types.ObjectId.createFromHexString(req.params.questionId) }
                    ]
                }
            )

            if(!form) {
                throw { code: 404, message: 'OPTION_DELETE_FAILED' }
            }

            return res.status(200).json({
                status: true,
                message: 'OPTION_DELETED',
                form
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            })
        }
    }
}

export default new OptionController();