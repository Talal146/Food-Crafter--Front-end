import '../App.css'
import { Link } from "react-router-dom"

const Nav = () => {


  return (
    <div className="nav">
      <Link to="/auth">auth</Link>
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
    </div>
  )
}

export default Nav