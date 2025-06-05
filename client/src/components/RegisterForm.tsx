import { useForm } from "react-hook-form"
import { Error } from "./Error"



export const RegisterForm = () => {

    const { handleSubmit, register, formState: { errors } } = useForm()

    const onSubmit = ( ) => {
        console.log('submitting')
    }
  return (
    <form 
        className="bg-white px-8 py-16 rounded-md mt-10"
        onSubmit={ handleSubmit( onSubmit ) }
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
                    ...register( 'name', {
                        required:'The name is required'
                    } )
                }
            />
        </div>
        { errors.name && <Error message={ `${errors.name.message}` }/>}
        {/* Email */}
        <div className="grid grid-cols-1 mb-2">
            <label htmlFor="email" className="mb-2">E-mail</label>
            <input
                type="email" 
                className="bg-slate-100 p-2 rounded-md"
                placeholder="Your email"
                name="email"
                id="email"
            />
        </div>
        {/* Handle */}
        <div className="grid grid-cols-1 mb-2">
            <label htmlFor="handle" className="mb-2">Handle</label>
            <input
                type="text" 
                className="bg-slate-100 p-2 rounded-md"
                placeholder="Your handle without spaces"
                name="handle"
                id="handle"
            />
        </div>
        {/* Password */}
        <div className="grid grid-cols-1 mb-2">
            <label htmlFor="password" className="mb-2">Password</label>
            <input
                type="password" 
                className="bg-slate-100 p-2 rounded-md"
                placeholder="Your password"
                name="password"
                id="password"
            />
        </div>
        {/* Confirm password */}
        <div className="grid grid-cols-1 mb-2">
            <label htmlFor="confirm" className="mb-2">Confirm Pasword</label>
            <input
                type="text" 
                className="bg-slate-100 p-2 rounded-md"
                placeholder="Confirm your password"
                name="confirm"
                id="confirm"
            />
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
