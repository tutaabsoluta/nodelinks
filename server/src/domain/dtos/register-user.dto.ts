


export class RegisterUserDto {


    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}


    static create( object: { [ key: string ]: any } ): [ string?, RegisterUserDto? ] {

        const { name, email, password } = object;

        if ( !name ) return [ 'Missing name', undefined ];

        if ( !email ) return [ 'Missing email', undefined ];

        if ( !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ) return [ 'Invalid email format', undefined ];

        if ( !password ) return [ 'Missing password', undefined ];

        if ( password.length < 8 ) return [ 'The password is too short', undefined ];


        return [ undefined, new RegisterUserDto(name, email, password) ];
    }

}
