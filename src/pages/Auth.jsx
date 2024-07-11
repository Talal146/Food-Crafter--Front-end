import '../App.css'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <div className="auth">
      <form className="sign-form">
        <h4>do you have account?</h4>
        <Link to="/auth/logIn">
          <button>LogIn</button>
        </Link>
        <h4>you don't have account?</h4>
        <Link to="/auth/register">
          <button>register</button>
        </Link>
      </form>
    </div>
  )
}

export default Auth
