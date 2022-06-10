import dotenv from "dotenv";
dotenv.config({ path: './config.env' })

enum Environments {
    dev = 'dev',
    prod = 'prod',
    local = 'local'
}

class Environment {
    private environment:String;

    constructor(environment:string){
        this.environment = environment;
    }

    getPort(): string|Number {
        if (this.environment === Environments.prod) {
            return 8081;
        } else {
            return process.env.PORT || 8080;
        }
    }

    getDbConfig():string{
        if(this.environment === Environments.prod){
            return 'prodDbConfig' //define production config
        } else if (this.environment === Environments.dev){
            return process.env.CONNECTION_STRING
        } else  
            return process.env.CONNECTION_STRING_LOCAL
    }
}

export default new Environment(Environments.local);