import { CustomError } from "../errors/custom.error";




export class UserEntity {

    
    constructor(
        public id: string,
        public user: string,
        public email: string,
        public password: string,
    ) { }


    public static fromObject( object: { [ key: string ]: any } ) {

        const { id, _id, name, email, password } = object;

        if ( !id && _id ) throw CustomError.badRequest('Missing id');
        if ( !name ) throw CustomError.badRequest('Missing name');
        if ( !email ) throw CustomError.badRequest('Missing email');
        if ( !password ) throw CustomError.badRequest('Missing password');

        return new UserEntity( id || _id, name, email, password );

    }
}