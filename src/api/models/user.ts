import mongoose from "mongoose";
import { AuditInfo } from "./common/audit";
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser {
    _id:number;
    name:{
        firstName:string,
        lastName:string
    };
    email?:string;
    age:number;
    occupation?:string
    auditInfo:AuditInfo[]
}

//Schema
var userSchema = new mongoose.Schema<IUser>({
    _id:{
        type:Number
    },
    name:{
        type:{
            firstName:String,
            lastName:String
        },
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
    },
    auditInfo:[AuditInfo]
});

userSchema.plugin(uniqueValidator);
//export user model
var User:mongoose.Model<any> = mongoose.model('user',userSchema);
export default User;
