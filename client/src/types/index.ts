


export type User = {
    handle: string
    name: string
    email: string
    description: string
    id: string
}

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type RegisterUser = Pick<User, 'handle' | 'email' | 'name' > & {
    password: string
    password_confirmation: string
}

export type LoginUser = Pick<User, 'email'> & {
    password: string
}