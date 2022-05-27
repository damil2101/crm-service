import { Application, Request, Response } from "express";

export class TestRoutes {

    public route(app: Application) {

        //Default url configuration
        app.get('/', (req:Request, res:Response) => 
            res.send('Hello World'));

        app.get('/test', (req: Request, res: Response) => {
            res.status(200).json({ message: "Get request successfull" });
        });

        app.post('/test', (req: Request, res: Response) => {
            res.status(200).json({ message: "Post request successfull" });
        });

    }
}