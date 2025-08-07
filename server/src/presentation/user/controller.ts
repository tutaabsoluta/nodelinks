import { Request, Response } from "express"
import { UpdateUserDto } from "../dtos/user/update-user.dto"
import { CustomError } from "../../domain"
import { UserService } from "../services/user/user.service"
import { FormidableAdapter } from "../../config/formidable.adapter"

export class UserController {

    constructor(
        public readonly userService: UserService
    ) { }

    private handleError = (error: any, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }

    getUser = (req: Request, res: Response) => {
        res.json(req.user)
    }



    updateUser = (req: Request, res: Response) => {
        const [error, updateUserDto] = UpdateUserDto.create(req.body);
        if (error || !updateUserDto) {
            return res.status(400).json({ error: error ?? 'Invalid input' });
        }

        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        this.userService.updateUser(req.user, updateUserDto)
            .then((user) => {
                res.send(user)
            })
            .catch((error) => {
                this.handleError(error, res)
            })
    }

    uploadImage = (req: Request, res: Response) => {

        FormidableAdapter.parseForm(req)
            .then((url) => res.status(200).json({ url }))
            .catch((error) => this.handleError(error, res));
    }
}