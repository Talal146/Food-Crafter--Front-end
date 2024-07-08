import '../App.css'
import RecipeCard from '../components/RecipeCard'

const MyRecipes = () => {


  return (
    <div className="my-recipes">
      Recipes List
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  )
}

export default MyRecipes