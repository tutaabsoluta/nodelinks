import { Link } from "react-router"

export const LoginPage = () => {
  return (
    <>

      <nav>
        <Link to={'/auth/register'}>Dont have an account? Create one!</Link>
      </nav>

    </>
  )
}
