import React, { useEffect, useState } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import Confirm from './Confirm'

const RecipesList = ({ user }) => {
  const [recipes, setRecipes] = useState([])
  const { id } = useParams()
  const [recipeToDelete, setRecipeToDelete] = useState(null)

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

  const handleDelete = async (recipeId) => {
    try {
      await Client.delete(`/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId))
      setRecipeToDelete(null) 
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  return (
    <div className="recipes-list">
      <h2>Recipes List</h2>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <RecipeCard
            recipe={recipe}
            user={user}
            onDelete={() => setRecipeToDelete(recipe)}/>
          <Confirm
            isOpen={recipeToDelete && recipeToDelete._id === recipe._id}
            onCancel={() => setRecipeToDelete(null)} 
            onConfirm={() => handleDelete(recipe._id)}
          />
        </div>
      ))}
    </div>
  )
}

export default RecipesList
