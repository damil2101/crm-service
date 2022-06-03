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
    dob:Date;
    occupation?:string;
    bodyHabits:string[];
    mindHabits:string[];
    auditInfo:AuditInfo[];
    theme?:string
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
    dob:{
        type:Date,
        required:true
    },
    occupation:{
        type:String
    },
    bodyHabits:[String],
    mindHabits:[String],
    theme:String,
    auditInfo:[AuditInfo]
});

userSchema.plugin(uniqueValidator);
//export user model
var User:mongoose.Model<any> = mongoose.model('user',userSchema);
export default User;
