import mongoose from "mongoose";


//Schema
var userSchema = new mongoose.Schema({
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
var User:mongoose.Model<any> = mongoose.model('user',userSchema);
export default User;
