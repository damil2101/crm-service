import { Application, Request, Response } from 'express';
import { request } from 'http';
import UserController from '../controllers/userController';


export class UserRoutes{

    private userCtrl:UserController = new UserController();

    public route(app:Application){

        app.post('/crm/register',async (req:Request, res:Response,next:any) => {
            await this.userCtrl.createUser(req,res);
        });

        app.get('/crm/users',async (req:Request,res:Response)=>{
            await this.userCtrl.listUsers(req,res);
        });

        app.get('/crm/users/:user_id',async (req:Request,res:Response)=>{
            await this.userCtrl.getUser(req,res);
        });

        app.put('/crm/users/:user_id',async (req:Request,res:Response)=>{
            await this.userCtrl.updateUser(req,res);
        });

        app.patch('/crm/users/:user_id',async (req:Request,res:Response)=>{
            await this.userCtrl.updateUser(req,res);
        });

        app.delete('/crm/users/:user_id',async (req:Request,res:Response)=>{
            await this.userCtrl.removeUser(req,res);
        });
    }
}

