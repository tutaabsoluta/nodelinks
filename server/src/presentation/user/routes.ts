import { Router } from "express";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";
import { UserController } from "./controller";
import { UserService } from "../services/user/user.service";


export class UserRoutes {

    static get routes(): Router  {

        const router =  Router();

        const service = new UserService()

        const controller = new UserController(service);


        router.get('/', [ AuthMiddleware.authenticate, controller.getUser ],);
        router.patch('/', [ AuthMiddleware.authenticate, controller.updateUser ],);

        return router;
    }
}