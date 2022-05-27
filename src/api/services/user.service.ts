import { IUser } from "../models/user";
import User from "../models/user";

export default class UserService {
    
    public async createUser(userParams:IUser, callback:any){
        const _userToCreate = new User(userParams);
        await _userToCreate.save(callback);
    }

    public async getUser(query:any,callback:any){
        await User.findOne(query,callback);
    }

    public async updateUser(userParams:IUser,callback:any){
        const query = {_id:userParams._id};
        await User.findOneAndUpdate(query,userParams,callback);
    }

    public async deleteUser(_id:Number,callback:any){
        const query = {_id:_id};
        await User.deleteOne(query,callback);
    }

    public async getAllUsers(callback:any){
        await User.find(callback);
    }
}