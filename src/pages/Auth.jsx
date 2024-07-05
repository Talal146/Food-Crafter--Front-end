import '../App.css'
import { Link } from "react-router-dom"


const Auth = () => {


  return (
    <div className="auth">
      Hi I'm auth
      <Link to="/auth/logIn">LogIn</Link>
      <Link to="/auth/signUp">SignUp</Link>
    </div>
  )
}

export default Auth