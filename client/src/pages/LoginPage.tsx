import { Link } from "react-router"

export const LoginPage = () => {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Login</h1>
      
      <nav className="mt-10">
        <Link 
          className="text-center text-white text-lg block"
          to={'/auth/register'}
        >
            Dont have an account? Create one!
        </Link>
      </nav>
    </>
  )
}
