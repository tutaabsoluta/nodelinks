import { CustomError } from "../errors/custom.error";




export class UserEntity {

    
    constructor(
        public id: string,
        public user: string,
        public email: string,
        public password: string,
        public emailValidated: boolean
    ) { }


    public static fromObject( object: { [ key: string ]: any } ) {

        const { id, _id, name, email, password, emailValidated } = object;

        if ( !id && _id ) throw CustomError.badRequest('Missing id');
        if ( !name ) throw CustomError.badRequest('Missing name');
        if ( !email ) throw CustomError.badRequest('Missing email');
        if ( !password ) throw CustomError.badRequest('Missing password');
        if ( emailValidated === undefined ) throw CustomError.badRequest('Missing emailValidated')

        return new UserEntity( id || _id, name, email, password, emailValidated );

    }
}