import mongoose, { model } from "mongoose";

var userSchema = mongoose.Schema({
    _id:Number,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    age:{
        type:Number,
        required:true
    },
    occupation:{
        type:String
    }
});

//export user model
var User = module.exports = mongoose.model('user',userSchema);
module.exports.get = function(callback,limit){
    User.find(callback).limit(limit);
}

export default User;