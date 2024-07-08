import '../App.css'
import { Link } from "react-router-dom"

const RecipeCard = () => {


  return (
    <Link to={`/recipeDetails`}>
      <div className="recipe-card">
        <h3>title</h3> <h5>delete</h5>
      </div>
    </Link>
  )
}

export default RecipeCard