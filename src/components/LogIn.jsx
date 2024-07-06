import '../App.css'

const LogIn = () => {


  return (
    <div className="log-in">
      Login page
      <form className='sign-form'>
        <div className="input-container">
          <label>user name</label>
          <input type="text" required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" required />
        </div>
        <button type='submit'>
          Log In
        </button>
      </form>  
    </div>
      
  )
}

export default LogIn