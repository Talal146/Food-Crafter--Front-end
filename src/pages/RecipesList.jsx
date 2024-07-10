import React, { useEffect, useState } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'

const RecipesList = ({ user }) => {
  const [recipes, setRecipes] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await Client.get('/recipes')
        const filteredRecipes = res.data.filter(
          (recipe) => recipe.categoryId === id
        )
        setRecipes(filteredRecipes)
      } catch (err) {
        console.log('Error fetching recipes:', err)
      }
    }

    fetchRecipes()
  }, [id])

  const handleDelete = (recipeId) => {
    setRecipes(recipes.filter((recipe) => recipe._id !== recipeId))
  }

  return (
    <div className="recipes-list">
      <h2>Recipes List</h2>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          user={user}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default RecipesList
