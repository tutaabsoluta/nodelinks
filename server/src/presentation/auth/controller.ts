import { Request, Response } from "express"



export class AuthController {

    // DI
    constructor() {}

    private handleError = () => {
        
    }

    registerUser = (req: Request, res: Response) => {
        res.json('Registrando...')
    }

    loginUser = (req: Request, res: Response) => {
        res.json('Logeando...')
    }
}