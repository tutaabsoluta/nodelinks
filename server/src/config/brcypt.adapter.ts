import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export class BcryptAdapter {


    public static hashPassword( password: string ): string {
        
        const salt = genSaltSync();

        return hashSync( password, salt );

    }

    public static compareHash( password: string, hashed: string ): boolean {

        return compareSync(password, hashed);

    } 
}