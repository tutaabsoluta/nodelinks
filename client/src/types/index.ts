


export type User = {
    handle: string
    name: string
    email: string
}

export type RegisterUser = Pick<User, 'handle' | 'email' | 'name' > & {
    password: string
    password_confirmation: string
}

export type LoginUser = Pick<User, 'email'> & {
    password: string
}