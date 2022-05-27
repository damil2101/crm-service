import User from '../models/user';
import { IUser } from '../models/user';
import {Request,Response} from 'express';
import * as responses from '../services/common/responses';
import UserService from '../services/user.service';

class UserController {

    private userService = new UserService();

    //Get all users
    public async listUsers(req:Request,res:Response){
        await this.userService.getAllUsers((err:any,users)=>{
            if(err){
                responses.dbError(err,res);
            } else{
                responses.successResponse("Get all users sucess",users,res);
            }
        })
    }


    //Create User
    public async createUser(req:Request,res:Response){

        if(!req.body.user_id || !req.body.age || (!req.body.name.firstName && !req.body.name.lastName)){
            responses.insufficientParameters(res);
        }

        const userParams:IUser = {
            _id:req.body.user_id,
            name:{
                firstName:req.body.name.firstName,
                lastName:req.body.name.lastName
            },
            email:req.body.email,
            age:req.body.age,
            occupation:req.body.occupation,
            auditInfo:[{
                modified_on: new Date(Date.now()),
                modified_by:null,
                modification_note:'New User registered'
            }]
        };
        await this.userService.createUser(userParams,(err:any,userData:IUser)=>{
            if(err){
                responses.dbError(err,res);
            } else{
                responses.successResponse('User registered ',userData,res);
            }
        })
    }

    // Get User by Id
    public async getUser(req:Request,res:Response){
        if(req.params.user_id){
            const userfilter = {_id : parseInt(req.params.user_id)};
            await this.userService.getUser(userfilter,(err:any,userData:IUser)=>{
                if(err){
                    responses.dbError(err,res);
                } else{
                    responses.successResponse('Get User Success',userData,res);
                }
            })
        } else{
            responses.insufficientParameters(res);
        }
    }

    //Update User
    public async updateUser(req:Request,res:Response){
        const userFilter = {_id:parseInt(req.params.user_id)};
        await this.userService.getUser(userFilter,async (err:any,userData:IUser)=>{
            if(err){
                responses.dbError(err,res);
            } else if(userData){
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
                    age: req.body.age ? req.body.age : userData.age,
                    occupation: req.body.occupation ? req.body.occupation : userData.occupation,
                    auditInfo : userData.auditInfo
                }

                await this.userService.updateUser(userParams,(err:any)=>{
                    if(err){
                        responses.dbError(err,res)
                    } else{
                        responses.successResponse('Update USer Success',null,res);
                    }
                });
            } else{
                responses.failureResponse("Invalid User",null,res);
            }
        })
    }

    //Delete User
    public async removeUser(req:Request,res:Response){
        if(req.params.user_id){
            await this.userService.deleteUser(parseInt(req.params.user_id),(err:any,deleteInfo)=>{
                if(err){
                    responses.dbError(err,res);
                } else if(deleteInfo.deletedCount !== 0){
                    responses.successResponse('User Delete Success',null,res);
                } else{
                    responses.failureResponse('Invalid User',null,res);
                }
            })
        } else{
            responses.insufficientParameters(res);
        }
    }
}

export default UserController;
