import User from '../models/user';

class UserController {

    list(req, res) {
        User.get(function (err, users) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        });
    };


    //Create User
    create = function (req, res) {
        User.findById(req.body.user_id,function(err,user){
            if(err)
                res.send(err);
            if(user)
                res.status(409).send("A user already exists with this key");
            else{
                var user = new User();
                user.name = req.body.name ? req.body.name : user.name;
                user.email = req.body.email;
                user.age = req.body.age;
                user.occupation = req.body.occupation;
                user._id = req.body.user_id;
        
                // save the user and check for errors
                user.save(function (err) {
                    if (err)
                        res.json(err);
                    res.json({
                        message: 'New user created!',
                        data: user
                    });
                });
            }    
        });
    };

    // Get User by Id
    view = function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            res.json({
                message: user == null ? 'No user found':'User info',
                data: user
            });
        });
    };

    //Update User
    update = function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }
            user.name = req.body.name ? req.body.name : user.name;
            if(req.body.email)
                user.email = req.body.email;
            if(req.body.occupation) 
                 user.occupation = req.body.occupation;
            if(req.body.age)    
                user.age = req.body.age;
            // save the contact and check for errors
            user.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'User Info updated',
                    data: user
                });
            });
        });
    };

    //Delete User
    remove = function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, contact) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'User deleted'
            });
        });
    };
}

export default UserController;