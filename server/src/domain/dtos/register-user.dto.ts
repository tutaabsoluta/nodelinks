


export class RegisterUserDto {


    constructor(
        public readonly handle: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}


    static create( object: {[ key: string ]: any} ): [ string?, RegisterUserDto? ] {

        if ( !object ) return [ 'Missing user, email and password', undefined ]

        const { handle, name, email, password } = object;

        if ( !handle ) return [ 'Missing handle' ];

        if ( !name ) return [ 'Missing name' ];

        if ( !email ) return [ 'Missing email' ];

        if ( !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ) return [ 'Invalid email format' ];

        if ( !password ) return [ 'Missing password' ];

        if ( password.length < 8 ) return [ 'The password is too short' ];


        return [ undefined, new RegisterUserDto( handle, name, email, password) ];
    }

}
