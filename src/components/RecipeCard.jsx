import '../App.css'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipeDetails/${recipe.id}`}>
      <div className="recipe-card">
        <h3>{recipe.title}</h3>
        <h5>Delete</h5>
      </div>
    </Link>
  )
}

export default RecipeCard
