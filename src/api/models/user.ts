import mongoose from "mongoose";

interface IUser {
    _id:number;
    name:string;
    email?:string;
    age:number;
    occupation?:string
}

//Schema
var userSchema = new mongoose.Schema<IUser>({
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
