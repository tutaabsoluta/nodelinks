import { Request, Response } from 'express';
import { AuthService } from "../services/auth.service"
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain"



export class AuthController {

    // DI
    constructor(
        public readonly authService: AuthService
    ) { }

    private handleError = (error: any, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }

    registerUser = (req: Request, res: Response) => {

        const [error, registerUserDto] = RegisterUserDto.create( req.body );
        
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.authService.registerUser(registerUserDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        
        const [ error, loginUserDto ] = LoginUserDto.create( req.body );

        if ( error ) return res.status(400).json({error});

        this.authService.loginUser( loginUserDto! )
            .then( (user) => res.json( user ) )
            .catch( (error) => this.handleError( error, res ) )
    }

    validateEmail(req: Request, res: Response) {

        const { token } = req.params;

        res.json(token);
        // this.authService.validateEmail( token )
        //     .then(() => { res.json('Email validated') })
        //     .catch(( error ) => { this.handleError(error, res)})
    }
}
