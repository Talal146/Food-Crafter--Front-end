import '../App.css'
import RecipeCard from '../components/RecipeCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

// filter all recpies by cata id

const RecipesList = () => {
  const [recipes, setRecipes] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/categories/${id}/recipesList`
        )

        setRecipes(res.data.recipe)
      } catch (err) {
        console.log('Error fetching recipes:', err)
      }
    }
    getRecipes(id)
  }, [id])

  return (
    <div className="recipes-list">
      Recipes List
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} id={recipe._id} name={recipe.name} />
      ))}
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  )
}

export default RecipesList
