import '../App.css'
import RecipeCard from '../components/RecipeCard'
import React, { useEffect, useState } from 'react'
import Client from '../services/api'
import Confirm from './Confirm'

const MyRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([])
  const [updateRec, setUpdateRec] = useState(false)
  const [recipeToDelete, setRecipeToDelete] = useState(null)

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
    try {
      await Client.delete(`/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId))
      setUpdateRec(!updateRec)
      setRecipeToDelete(null)
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  const handleUpdate = (recipeId) => {
    console.log(`Update recipe with id: ${recipeId}`)
  }

  if (!user) {
    return <h3 className="unavailable">Please log in to view your recipes.</h3>
  }

  return (
    <div className="my-recipes">
      {userRecipes.length ? (
        userRecipes.map((recipe) => (
          <div key={recipe._id}>
            <RecipeCard
              recipe={recipe}
              onDelete={() => setRecipeToDelete(recipe)}
              onUpdate={handleUpdate}
              user={user}
              setUpdateRec={setUpdateRec}
            />
            <Confirm
              isOpen={recipeToDelete && recipeToDelete._id === recipe._id}
              onCancel={() => setRecipeToDelete(null)}
              onConfirm={() => handleDelete(recipe._id)} 
            />
          </div>
        ))
      ) : (
        <h3 className="unavailable">No recipes yet</h3>
      )}
    </div>
  )
}

export default MyRecipes
