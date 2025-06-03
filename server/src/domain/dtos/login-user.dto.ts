


export class LoginUserDto {
    
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {}

    static create( object:{ [ key: string ]: any } ): [ string?, LoginUserDto? ] {

        if ( !object ) return [ 'Missing email and password', undefined ]

        const { email, password } = object;

        if ( !email ) return [ 'Missing email', undefined ];

        if ( !password ) return [ 'Missing password', undefined ];
        
        if ( !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ) return [ 'Invalid email format', undefined ];

        return [ undefined, new LoginUserDto( email, password ) ];
    }
}
