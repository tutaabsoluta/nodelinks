import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { JwtPayload } from "jsonwebtoken";
import { UserEntity } from "../../domain";

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity
        }
    }
}


export class AuthMiddleware {

    public static authenticate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bearer = req.headers.authorization;

            if (!bearer) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const [, token] = bearer.split(' ');

            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }

            const decoded = await JwtAdapter.validateJwt(token);
            if (!decoded) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const { id } = decoded as JwtPayload;
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const userEntity = UserEntity.fromObject(user);
            const { password, ...userWithoutPassword } = userEntity as any;
            req.user = userWithoutPassword;

            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

}