import { Router } from "express";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";
import { UserController } from "./controller";


export class UserRoutes {

    static get routes(): Router  {

        const router =  Router();

        router.get('/', [ AuthMiddleware.authenticate, UserController.getUser ],);

        return router;
    }
}