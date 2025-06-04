import { Link } from "react-router"


export const RegisterPage = () => {
  return (
    <>
      <nav>
        <Link to={'/auth/login'}>Already have an account? Login!</Link>
      </nav>
    </>
  )
}
