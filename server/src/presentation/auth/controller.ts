import { Request, Response } from "express"



export class AuthController {

    // DI
    constructor() {}

    registerUser = (req: Request, res: Response) => {
        res.json('Registrando...')
    }

    loginUser = (req: Request, res: Response) => {
        res.json('Logeando...')
    }
}