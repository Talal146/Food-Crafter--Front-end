import '../App.css'
import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav className="nav">
        <h4 className="greeting">Welcome {user.email}!</h4>
        <Link to="/">Home</Link>
        <Link to="/recipes/create">Create</Link>
        <Link to="/myRecipes">My Recipes</Link>
        
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }
  const pubOp = (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/auth">Auth</Link>
    </nav>
  )

  return <header>{user ? userOptions : pubOp}</header>
}

export default Nav
