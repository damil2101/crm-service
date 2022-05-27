import mongoose from "mongoose";
import env from "../../environments";

mongoose.Promise = global.Promise;

mongoose.connect(env.getDbConfig());
mongoose.connection
        .once('open',() => console.log('Db Connected'))
        .on('error',(error) =>{
            console.warn('Error connecting to db :',error)
        });

//clean db before running
beforeEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
        done();
    });
});
