import React from 'react'
import { Link } from 'react-router-dom'
import { deleteRecipe } from '../services/Auth'

const RecipeCard = ({ recipe, onDelete, user }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?'
    )

    if (confirmDelete) {
      try {
        await deleteRecipe(recipe._id) // Call deleteRecipe method
        if (onDelete) {
          onDelete(recipe._id) // Call onDelete prop to update parent state
        }
        // Reload the page after successful deletion
        window.location.reload()
      } catch (error) {
        console.error('Error deleting recipe:', error)
      }
    }
  }

  const canModify = user && recipe.userId === user.id

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
