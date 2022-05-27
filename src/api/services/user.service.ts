import { IUser } from "../models/user";
import User from "../models/user";

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
}