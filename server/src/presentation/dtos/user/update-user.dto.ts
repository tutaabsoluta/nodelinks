

export class UpdateUserDto {

    constructor (
        public readonly handle: string,
        public readonly description: string
    ) { }

    static create( object: { [key: string]: any } ): [ string?, UpdateUserDto? ] {

        const { handle, description } = object;

        if (!object || Object.keys(object).length === 0) return ['Missing handle and description', undefined];

        if (!handle) return ['Missing handle'];

        if (!description) return ['Missing description'];

        return [ undefined, new UpdateUserDto(handle, description) ]
    }

}