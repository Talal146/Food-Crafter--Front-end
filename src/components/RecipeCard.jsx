import React from 'react'
import { Link } from 'react-router-dom'
import { deleteRecipe } from '../services/Auth'

const RecipeCard = ({ recipe, onDelete, currentUser }) => {
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

  const canModify = currentUser && recipe.userId === currentUser.id

  return (
    <div className="recipe-card">
      <Link to={`/recipes/${recipe._id}`}>
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
