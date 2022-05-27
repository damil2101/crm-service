import express from 'express';
import bodyParser from "body-parser";
import { TestRoutes } from './api/routes/test-routes';
import { ErrorRoutes } from './api/routes/error-routes';
import { UserRoutes } from './api/routes/api-routes';
import env from './environments';
import mongoose from 'mongoose';

class App {
    public app: express.Application;
    private test_routes: TestRoutes = new TestRoutes();
    private user_routes:UserRoutes = new UserRoutes();
    private error_routes: ErrorRoutes = new ErrorRoutes();
    public dbConfig: string = env.getDbConfig();
    private count=0;
    constructor() {
        this.app = express();
        this.config();
        this.dbSetup();
        this.test_routes.route(this.app);
        this.user_routes.route(this.app);
        this.error_routes.route(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private dbSetup(): void {
        //db connection
        console.log('Attempting MongoDb connection (retry if needed)');
        
        mongoose.connect(this.dbConfig)
            .then(() => console.log('Db connection successful'))
            .catch((err) => {
                console.error(err)
                const retryInterval = 5;
                console.log(`MongoFb connection unsuccessful (retrying for ${++this.count} times after ${retryInterval}`,err);
                setTimeout(this.dbSetup,retryInterval*1000);
            });
    }
}

export default new App().app;