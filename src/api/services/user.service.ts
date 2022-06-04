import { IUser } from "../models/user";
import User from "../models/user";
import { bodyBasics, mindBasics } from "../models/userHabits";

export default class UserService {
    
    public async createUser(userParams:IUser){
        const _userToCreate = new User(userParams);
        return await _userToCreate.save();
    }

    public async getUser(query:any){
       return await User.findOne(query);
    }

    public async updateUser(userParams:IUser){
        const query = {_id:userParams._id};
        return await User.findOneAndUpdate(query,userParams);
    }

    public async deleteUser(_id:Number){
        const query = {_id:_id};
        return await User.deleteOne(query);
    }

    public async getAllUsers(){
        return await User.find();
    }

    public async getUserHabits(query:any){
        const user = await User.findOne(query);
        if(user)
            return user.userHabits;
        return {};
    }

    public async updateUserHabits(query:any,bodyHabits:Array<bodyBasics>,mindHabits:Array<mindBasics>){
        const user = await User.findOne(query);
        if(user){

            user.auditInfo.push({
                modified_on: new Date(Date.now()),
                modified_by:null,
                modification_note:'User Habits updated'
            });

            user.userHabits.body = bodyHabits;
            user.userHabits.mind = mindHabits;
            return await user.save();
        }
    }
}