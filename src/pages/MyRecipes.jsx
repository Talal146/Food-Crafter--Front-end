import '../App.css'
import RecipeCard from '../components/RecipeCard'
import React, { useEffect, useState } from 'react'
import Client from '../services/api'

const MyRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([])
  const [updateRec, setUpdateRec] = useState(false)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await Client.get('/recipes')
        setRecipes(response.data)
      } catch (error) {
        console.error('Error Data Fetching:', error)
      }
    }
    fetchRecipes()
  }, [updateRec])

  const userRecipes = recipes.filter((recipe) => recipe.userId === user.id)

  const handleDelete = async (recipeId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?'
    )

    if (confirmDelete) {
      try {
        await Client.delete(`/recipes/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        setRecipes(recipes.filter((recipe) => recipe._id !== recipeId))
        setUpdateRec(!updateRec) // Toggle updateRec to trigger useEffect
      } catch (error) {
        console.error('Error deleting recipe:', error)
      }
    }
  }

  const handleUpdate = (recipeId) => {
    // Implement update functionality as needed
    console.log(`Update recipe with id: ${recipeId}`)
  }

  if (!user) {
    return <h3 className="unavailable">Please log in to view your recipes.</h3>
  }

  return (
    <div className="my-recipes">
      {userRecipes.length ? (
        userRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            user={user}
            setUpdateRec={setUpdateRec}
          />
        ))
      ) : (
        <h3 className="unavailable">No recipes yet</h3>
      )}
    </div>
  )
}

export default MyRecipes
