import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe, onDelete, user }) => {
  const canModify = user && recipe.userId === user.id

  const handleDelete = () => {
    onDelete(recipe._id)
  }

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
