import mongoose from "mongoose"
import Form from "../models/Form.js"

const allowedTypes = ['Text', 'Radio', 'Checkbox', 'Dropdown', 'Email']

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
                type: 'Text',
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

    async update(req, res) {
        try {
            if (!req.params.id) {
                throw { code: 400, message: 'FORM_ID_IS_REQUIRED' };
            }

            if (!req.params.questionId) {
                throw { code: 400, message: 'QUESTION_ID_IS_REQUIRED' };
            }

            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                throw { code: 400, message: 'INVALID_FORM_ID' };
            }

            if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
                throw { code: 400, message: 'INVALID_QUESTION_ID' };
            }

            let field = {}
            if(req.body.hasOwnProperty('question')) {
                field['questions.$[indexQuestion].question'] = req.body.question
            }else if(req.body.hasOwnProperty('required')) {
                field['questions.$[indexQuestion].required'] = req.body.required
            }else if(req.body.hasOwnProperty('type')) {
                if(!allowedTypes.includes(req.body.type)) {
                    throw { code: 400, message: 'INVALID_QUESTION_TYPE' };
                }

                field['questions.$[indexQuestion].type'] = req.body.type
            }

            const update = {
                $set: field
            };

            const options = {
                arrayFilters: [
                    { 'indexQuestion.id': mongoose.Types.ObjectId.createFromHexString(req.params.questionId) }
                ],
                new: true
            };

            const form = await Form.findOneAndUpdate(
                { _id: req.params.id, userId: req.jwt.id },
                update,
                options
            );

            if (!form) {
                throw { code: 404, message: 'QUESTION_UPDATE_FAILED' };
            }

            return res.status(200).json({
                status: true,
                message: 'QUESTION_UPDATED',
                data: form.questions
            });
        } catch (err) {
            if (!err.code) {
                err.code = 500;
            }
            return res.status(err.code).json({
                status: false,
                message: err.message
            });
        }
    }
}

export default new QuestionController()