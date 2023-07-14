import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    workers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    }]
}, {timestamps: true})

export default mongoose.model('Group', GroupSchema)