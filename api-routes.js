import express from 'express';
import UserController from './controllers/userController';

//Init Router
let router = express.Router();
let userCtrl = new UserController(); 
//default route
router.get('/',function(req,res){
    res.json({
        status:"API is up",
        message:" welcome to crm-service"
    }); 
});

//user routes
router.route('/register')
    .post(userCtrl.create);

router.route('/users')
        .get(userCtrl.list);

router.route('/users/:user_id')
    .get(userCtrl.view)
    .patch(userCtrl.update)
    .put(userCtrl.update)
    .delete(userCtrl.remove)        

//Export API routes
export default router;