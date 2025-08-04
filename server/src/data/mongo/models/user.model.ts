import mongoose from 'mongoose'

// export interface IUser {
//     handle: string
//     name: string
//     email: string
//     password: string
//     emailValidated: boolean
// }

const userSchema = new mongoose.Schema({

    handle: {
        type: String,
        required: [true, 'The handle is required'],
        trim: true,
        lowecase: true,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },

    emailValidated: {
        type: Boolean,
        default: false
    },

    description: {
        type: String,
        default: '',
    },
});

export const UserModel = mongoose.model('User', userSchema);