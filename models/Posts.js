import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    content: {
        type: String,
        trim: true
    },
    attachment: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likeCount: {
        type: Array,
        default: []
    }
}, { timestamps: true })

export const PostModel = mongoose.model('Post', schema);