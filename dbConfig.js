import dotenv from "dotenv";
dotenv.config({path:'./env'})

class DBConfiguration{
    constructor(){
        this.COSMOS_USER = 'damilcosmosdb';
        this.COSMOS_PASSWORD = process.env.COSMOS_PASSWORD;
        this.COSMOS_DBNAME = 'crmservice';
        this.COSMOS_HOST = 'damilcosmosdb.mongo.cosmos.azure.com';
        this.COSMOS_PORT = '10255';
    }
}
export default DBConfiguration;