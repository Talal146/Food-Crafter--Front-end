import '../App.css'

const SignUp = () => {


  return (
    <div className="sign-up">
      signup page
      <form className='sign-form'>
        <div className="input-container">
          <label>user name</label>
          <input type="text" required />
        </div>
        <div className="input-container">
          <label>email</label>
          <input type="email" required />
        </div>
        <div className="input-container">
          <label>password</label>
          <input type="password" required />
        </div>
        <div className="input-container">
          <label>Confirm password</label>
          <input type="password" required />
        </div>
        <button type='submit'>
            Sign Up
          </button>
      </form>  
    </div>
  )
}

export default SignUp