import '../App.css'
import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav className="nav">
        <div className='left-nav'><h4 className="greeting">Welcome {user.email}!</h4></div>
        <div className='right-nav'>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link> 
          <Link to="/myRecipes">MyRecipes</Link>
        
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        </div>
      </nav>
    )
  }
  const pubOp = (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/auth">auth</Link>
    </nav>
  )
  return <header>{user ? userOptions : pubOp}</header>
}

export default Nav
