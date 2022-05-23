import DBConfiguration from './dbConfig';
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
const dbConfig = new DBConfiguration();
const connString = `mongodb://${dbConfig.COSMOS_HOST}:${dbConfig.COSMOS_PORT}/${dbConfig.COSMOS_DBNAME}?ssl=true&replicaSet=globaldb&retrywrites=false`

mongoose.connect(connString,{
    useNewUrlParser:true,
    auth:{
        username:dbConfig.COSMOS_USER,
        password:dbConfig.COSMOS_PASSWORD,
    },
}).then(()=>console.log('Db connection successful'))
.catch((err)=>console.error(err));


// Port configuration
var port = process.env.PORT || 8080;

//Default url configuration
app.get('/',(req,res)=> res.send('Hello World'));

//Launch app
app.listen(port,()=>{
    console.log("Running crm-service on port"+ port)});
    

