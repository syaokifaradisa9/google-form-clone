import mongoose from "mongoose"
import Form from "../models/Form.js"

class QuestionController {
    async store(req, res) {
        try {
            if(!req.params.id) {
                throw { code: 400, message: 'FORM_ID_IS_REQUIRED' } 
            }

            if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
                throw { code: 400, message: 'INVALID_FORM_ID' }
            }

            const newQuestion = {
                id: new mongoose.Types.ObjectId(),
                question: null,
                type: 'text', // text, radio, checkbox, dropdown
                required: false,
                options: []
            }

            const form = await Form.findOneAndUpdate(
                { _id: req.params.id, userId: req.jwt.id },
                { $push: { questions: newQuestion } },
                { new: true }
            )

            if (!form) {
                throw { code: 404, message: 'FORM_UPDATE_FAILED' }
            }
            
            return res.status(200).json({
                status: true,
                message: 'QUESTION_CREATED',
                data: newQuestion
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            })
        }
    }
}

export default new QuestionController()