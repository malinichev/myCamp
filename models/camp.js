//Schema setup
import mongoose from 'mongoose';
const campSchema = new mongoose.Schema({
    title: String,
    image: String,
    desc: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'comments'                              //имя модели
        }
    ]
});

const Camp = mongoose.model('CampColl', campSchema);

export default Camp;