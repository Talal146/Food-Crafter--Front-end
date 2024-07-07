import '../App.css'
import RecipeCard from '../components/RecipeCard'

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