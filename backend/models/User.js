import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
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
});

export default mongoose.model('User', Schema)