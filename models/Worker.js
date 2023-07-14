import mongoose from 'mongoose';

const WorkerSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    salary: {
        type: String, 
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }

}, {timestamps: true})

export default mongoose.model('Worker', WorkerSchema);