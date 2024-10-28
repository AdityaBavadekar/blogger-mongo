import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: false,
        default: 'https://img.freepik.com/free-photo/wet-sphere-reflective-water-abstract-beauty-generated-by-ai_188544-19616.jpg'
    },
    content:{
        type: String,
        required: true
    },
    author: {
        type: String,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Post  = mongoose.model('Post', postSchema);
export default Post;