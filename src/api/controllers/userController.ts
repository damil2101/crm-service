import User from '../models/user';
import { IUser } from '../models/user';
import {Request,Response} from 'express';
import * as responses from '../services/common/responses';
import UserService from '../services/user.service';

class UserController {

    private userService = new UserService();

    //Get all users
    public async listUsers(req:Request,res:Response){
        try {
            const users = await this.userService.getAllUsers();
            responses.successResponse("Get All Users Success",users,res);
        } catch (error) {
            responses.dbError(error,res);
        }
    }


    //Create User
    public async createUser(req:Request,res:Response){

        if(!req.body.user_id || !req.body.dob || (!req.body.name.firstName && !req.body.name.lastName)){
            responses.insufficientParameters(res);
        }

        const userParams:IUser = {
            _id:req.body.user_id,
            name:{
                firstName:req.body.name.firstName,
                lastName:req.body.name.lastName
            },
            email:req.body.email,
            dob:req.body.dob,
            occupation:req.body.occupation,
            bodyHabits:req.body.bodyHabits,
            mindHabits:req.body.mindHabits,
            theme:req.body.theme,
            auditInfo:[{
                modified_on: new Date(Date.now()),
                modified_by:null,
                modification_note:'New User registered'
            }]
        };


        try {
            const createdUser = await this.userService.createUser(userParams);
            responses.successResponse('User Registered',createdUser,res);
        } catch (error) {
            responses.dbError(error,res);
        }
    }

    // Get User by Id
    public async getUser(req:Request,res:Response){
        if(req.params.user_id){
            const userfilter = {_id : parseInt(req.params.user_id)};
            try {
                const user = await this.userService.getUser(userfilter);
                if(user)
                    responses.successResponse('Get User Success',user,res);
                else
                    responses.nonExistant('Invalid or Non existent user',res);    
            } catch (error) {
                responses.dbError(error,res);
            }
        } else{
            responses.insufficientParameters(res);
        }
    }

    //Update User
    public async updateUser(req:Request,res:Response){
        const userFilter = {_id:parseInt(req.params.user_id)};
        try {
            const userData = await this.userService.getUser(userFilter);
            if(userData){
                userData.auditInfo.push({
                    modified_on: new Date(Date.now()),
                    modified_by:null,
                    modification_note:'User Data updated'
                });
                const userParams:IUser = {
                    _id:userData._id,
                    name:req.body.name ? {
                        firstName:req.body.name.firstName ? req.body.name.firstName : userData.name.firstName,
                        lastName:req.body.name.lastName ? req.body.name.lastName : userData.name.lastName
                    } : userData.name,
                    email: req.body.email ? req.body.email : userData.email,
                    dob: req.body.dob ? req.body.dob : userData.dob,
                    occupation: req.body.occupation ? req.body.occupation : userData.occupation,
                    bodyHabits:req.body.bodyHabits ? req.body.bodyHabits : userData.bodyHabits,
                    mindHabits:req.body.mindHabits ? req.body.mindHabits : userData.mindHabits,
                    theme:req.body.theme ? req.body.theme : userData.theme,
                    auditInfo : userData.auditInfo
                }

                const updatedUser = await this.userService.updateUser(userParams);
                responses.successResponse("User Updated Successfully",null,res);
                
            }
            else{
                responses.nonExistant("Invalid or non existant user",res);
            }
        } catch (error) {
            responses.dbError(error,res);
        }
    }

    //Delete User
    public async removeUser(req:Request,res:Response){
        if(req.params.user_id){
            try {
                const deleleInfo = await this.userService.deleteUser(parseInt(req.params.user_id));
                if(deleleInfo.deletedCount !== 0 ){
                    responses.successResponse('User deleted Successfully',null,res);
                }
                else{
                    responses.failureResponse('Invalid User',null,res);
                }
            } catch (error) {
                responses.dbError(error,res);
            }
        } else{
            responses.insufficientParameters(res);
        }
    }
}

export default UserController;
