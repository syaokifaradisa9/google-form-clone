import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    questions: {
        type: Array
    },
    invites: {
        type: Array
    },
    public: {
        type: Boolean
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    }
},{
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    }
})

export default mongoose.model('Form', Schema)