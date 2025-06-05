import { Link } from "react-router"


export const RegisterPage = () => {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create an account</h1>
      
      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to={'/auth/login'}
        >
          Already have an account ? Login!
        </Link>
      </nav>
    </>
  )
}


