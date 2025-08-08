import { isAxiosError } from "axios";
import { useForm } from "react-hook-form"
import { ErrorMessage } from "./ui/ErrorMessage"
import type { RegisterUser } from "../types";
import { toast } from "sonner";
import api from "../config/axios";



export const RegisterForm = () => {

    const initialValues = {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: '',
    }

    const { handleSubmit, register, reset, watch, formState: { errors } } = useForm<RegisterUser>({ defaultValues: initialValues });

    const handleRegister = async (formData: RegisterUser) => {

        try {
            const { data } = await api.post('/auth/register', formData);
            toast.success(data.message, {
                style: {
                    backgroundColor: '#72ed97',
                    fontSize: '16px',
                    color: 'black'
                }
            })

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error, {
                    style: {
                        backgroundColor: '#db4b4b',
                        fontSize: '16px',
                        color: 'white'
                    }
                })
            }
        }

        reset();
    }


    const password = watch('password');

    return (
        <form
            className="bg-white px-8 py-16 rounded-md mt-10"
            onSubmit={handleSubmit(handleRegister)}
        >

            {/* Name */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="name" className="mb-2">Name</label>
                <input
                    type="text"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Your name"
                    id="name"
                    {
                    ...register('name', {
                        required: 'The name is required'
                    })
                    }
                />
                {errors.name && <ErrorMessage message={`${errors.name.message}`} />}
            </div>
            {/* Email */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="email" className="mb-2">E-mail</label>
                <input
                    type="email"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Your email"
                    id="email"
                    {
                    ...register('email', {
                        required: 'The email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })
                    }
                />
                {errors.email && <ErrorMessage message={`${errors.email.message}`} />}
            </div>
            {/* Handle */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="handle" className="mb-2">Handle</label>
                <input
                    type="text"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Your handle without spaces"
                    id="handle"
                    {
                    ...register('handle', {
                        required: 'The handle is required',
                    })
                    }
                />
                {errors.handle && <ErrorMessage message={`${errors.handle.message}`} />}
            </div>
            {/* Password */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="password" className="mb-2">Password</label>
                <input
                    type="password"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Your password"
                    id="password"
                    {
                    ...register('password', {
                        required: 'The password is required',
                        // pattern: {
                        //     value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                        //     message: 'The password must have at least a number, symbol and uppercase letter'
                        // },
                        minLength: {
                            value: 8,
                            message: 'The password must contain at least 8 characters'
                        }
                    })
                    }
                />
                {errors.password && <ErrorMessage message={`${errors.password.message}`} />}
            </div>
            {/* Confirm password */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="confirm" className="mb-2">Confirm Pasword</label>
                <input
                    type="password"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Confirm your password"
                    id="confirm"
                    {
                    ...register('password_confirmation', {
                        required: 'Please confirm your password',
                        min: {
                            value: 8,
                            message: 'The password must contain at least 8 characters'
                        },
                        validate: (value) => value === password || 'The passwords doesnt match'
                    })
                    }
                />
                {errors.password_confirmation && <ErrorMessage message={`${errors.password_confirmation.message}`} />}
            </div>
            {/* Submit Buttom */}
            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white uppercase font-bold py-2 rounded-md mt-6"
            >
                Create Account
            </button>
        </form>
    )
}
