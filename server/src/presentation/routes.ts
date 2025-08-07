import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./user/routes";
import { AuthMiddleware } from "../infrastructure/middleware/auth.middleware";



export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use( '/auth', AuthRoutes.routes );
        router.use( '/user',AuthMiddleware.authenticate, UserRoutes.routes );


        return router;
    }

}