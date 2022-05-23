import dotenv from "dotenv";
dotenv.config({path:'./config.env'})
import express from 'express';
import bodyParser from "body-parser";
import api from './api-routes';
import mongoose from 'mongoose';

//Initialize app
let app = express();

// use body parser to handle requests
//IMP: Order matters here
//
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:false
}));


//Use Routing
app.use('/crm',api);

//db connection

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
}).then(()=>console.log('Db connection successful'))
.catch((err)=>console.error(err));


// Port configuration
var port = process.env.PORT || 8080;

//Default url configuration
app.get('/',(req,res)=> res.send('Hello World'));

//Launch app
app.listen(port,()=>{
    console.log("Running crm-service on port"+ port)});
    

