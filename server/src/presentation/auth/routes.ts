import { AuthController } from "./controller";
import { AuthService, EmailService } from "../services";
import { envs } from "../../config";
import { Router } from "express";
import { AuthMiddleware } from "../../infrastructure/middleware/auth.middleware";




export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const emailService = new EmailService( envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY );

        const authService = new AuthService( emailService );

        const controller = new AuthController( authService );

        router.post( '/register', controller.registerUser );
        router.post( '/login', controller.loginUser );
        router.get( '/validate-email/:token', controller.validateEmail );


        return router;
    }
}