import mongoose from 'mongoose';
import pasportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(pasportLocalMongoose);

const User = mongoose.model('User', userSchema);
export default User