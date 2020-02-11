//Schema setup
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"                 //какой моделью пользовася
        },
        username: String
    }
});

const comments = mongoose.model('comments', commentSchema);

export default comments