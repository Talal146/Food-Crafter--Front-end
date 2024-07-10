import React from 'react'
import { Link } from 'react-router-dom'
import { deleteRecipe } from '../services/Auth'

const RecipeCard = ({ recipe, onDelete, user }) => {
  const handleDelete = async () => {
    try {
      await deleteRecipe(recipe._id)
      if (onDelete) {
        onDelete(recipe._id)
      }
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  const canModify = user && recipe.userId === user.id

  return (
    <div className="recipe-card">
      <Link to={`/recipes/${recipe._id}`} user={user}>
        <h3>{recipe.name}</h3>
      </Link>
      <div className="card-buttons">
        {canModify && (
          <>
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/editRecipe/${recipe._id}`}>
              <button>Edit</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default RecipeCard
