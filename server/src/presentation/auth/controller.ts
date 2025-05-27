import { Request, response, Response } from "express"
import { AuthService } from "../services/auth.service"
import { CustomError, RegisterUserDto } from "../../domain"



export class AuthController {

    // DI
    constructor(
        public readonly authService: AuthService
    ) {}

    private handleError = ( error: any, res: Response ) => {
        if ( error instanceof CustomError ){
            return res.status( error.statusCode ).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }

    registerUser = (req: Request, res: Response) => {
        const [ error, registerUserDto ] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({error});

        this.authService.registerUser( registerUserDto! )
            .then( (user) => res.json(user) )
            .catch( (error) => this.handleError( error, res ) )
    }

    loginUser = (req: Request, res: Response) => {
        res.json('Logeando...')
    }
}

/*
Controller:
- Crear el DTO
- Verificar si existe un error
-- Llamar al servicio y pasarle los datos
*/