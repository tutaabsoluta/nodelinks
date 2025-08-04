import { CustomError } from "../errors/custom.error";




export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public handle: string,
        public email: string,
        public password: string,
        public emailValidated: boolean,
        public description?: string,
    ) {}

    public static fromObject(object: { [key: string]: any }) {
        const { id, _id, name, handle, email, password, emailValidated, description } = object;

        if (!id && !_id) throw CustomError.badRequest('Missing id');
        if (!name) throw CustomError.badRequest('Missing name');
        if (!handle) throw CustomError.badRequest('Missing handle');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!password) throw CustomError.badRequest('Missing password');
        if (emailValidated === undefined) throw CustomError.badRequest('Missing emailValidated');

        return new UserEntity(id || _id, name, handle, email, password, emailValidated, description);
    }
}
