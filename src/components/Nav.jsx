import '../App.css'
import { Link } from "react-router-dom"

const Nav = () => {


  return (
    <div className="nav">
      <Link to="/auth">auth</Link>
    </div>
  )
}

export default Nav