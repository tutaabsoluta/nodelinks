import { isAxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import api from "../config/axios"
import type { LoginUser } from "../types"
import { ErrorMessage } from "./ui/ErrorMessage"

export const LoginForm = () => {

    const initialValues = {
        email: '',
        password: '',
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginUser>({ defaultValues: initialValues })

    const handleLogin = async (formdata: LoginUser) => {
        try {
            const { data } = await api.post('auth/login', formdata);
            //Save the token in Local Storage
            localStorage.setItem('AUTH_TOKEN', data.token);
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

    return (
        <form
            className="bg-white px-8 py-16 rounded-md mt-10"
            onSubmit={handleSubmit(handleLogin)}
        >

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

            {/* Submit Buttom */}
            <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white uppercase font-bold py-2 rounded-md mt-6"
            >
                Login
            </button>
        </form>
    )
}
