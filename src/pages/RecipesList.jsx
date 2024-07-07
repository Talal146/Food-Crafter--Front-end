import '../App.css'
import RecipeCard from '../components/RecipeCard'
import { Link } from "react-router-dom"

const RecipesList = () => {


  return (
    <div className="recipes-list">
      Recipes List
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  )
}

export default RecipesList