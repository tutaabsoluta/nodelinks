import { Request, Response } from 'express';
import { AuthService } from "../services/auth.service"
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain"
import { JwtAdapter } from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../../data';



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

        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.authService.registerUser(registerUserDto!)
            .then((user) => res.status(201).json(user))
            .catch((error) => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {

        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if (error) return res.status(400).json({ error });

        this.authService.loginUser(loginUserDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res))
    }

    validateEmail = (req: Request, res: Response) => {

        const { token } = req.params;

        console.log(token)

        this.authService.validateEmail(token)
            .then(() => { res.json('Email validated') })
            .catch((error) => { this.handleError(error, res) })
    }

    getUser = (req: Request, res: Response) => {
        const bearer = req.headers.authorization;

        if (!bearer) {
            const error = new Error('Unauthorized')
            return res.status(401).json({ error: error.message });
        }

        const [, token] = bearer.split(' ');

        if (!token) {
            const error = new Error('No token provided')
            return res.status(500).json({ error: error.message });
        }

        JwtAdapter.validateJwt(token)
            .then(decoded => {
                if (!decoded) {
                    return res.status(401).json({ error: 'Invalid token' });
                }

                const { id } = decoded as JwtPayload;

                return UserModel.findById(id)
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({ error: 'User not found' });
                        }

                        return res.status(200).json({ user });
                    });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    }
}
