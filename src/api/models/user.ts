import mongoose from "mongoose";
import { AuditInfo } from "./common/audit";
import uniqueValidator from 'mongoose-unique-validator';
import userHabitsSchema, { IUserHabits } from "./userHabits";

export interface IUser {
    _id:number;
    name:{
        firstName:string,
        lastName:string
    };
    email:string;
    dob:Date;
    occupation?:string;
    userHabits?:IUserHabits;
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
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true
    },
    occupation:{
        type:String
    },
    userHabits:userHabitsSchema,
    theme:String,
    auditInfo:[AuditInfo]
});

userSchema.plugin(uniqueValidator);
//export user model
var User:mongoose.Model<any> = mongoose.model('user',userSchema);
export default User;
