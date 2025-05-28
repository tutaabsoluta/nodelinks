import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {



    static async generetaToken(payload: any, duration: SignOptions['expiresIn'] = '2h') {

        return new Promise((resolve) => {
            jwt.sign(payload, "SEED", { expiresIn: duration }, (err, token) => {

                if (err) return resolve(null)

                resolve(token)
            });
        });
    }

    static validateJwt(token: string) {

    }
}
