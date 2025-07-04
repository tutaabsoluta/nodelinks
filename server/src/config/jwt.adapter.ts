import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {



    static async generetaToken( payload: JwtPayload, duration: SignOptions['expiresIn'] = '100d' ) {

        return new Promise((resolve) => {
            jwt.sign( payload, JWT_SEED, { expiresIn: duration }, (err, token) => {

                if (err) return resolve(null)

                resolve(token)
            });
        });
    }

    static validateJwt(token: string) {

        return new Promise((resolve) => {

            jwt.verify( token, JWT_SEED, ( error, decoded ) => {

                if ( error ) resolve( null );
                
                resolve( decoded );
            })

        })
    }
}
