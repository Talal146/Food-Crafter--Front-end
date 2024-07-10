import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../services/api'
import Review from '../components/Review'
const RecipeDetails = ({ user }) => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/recipes`)
        const filteredRecipe = response.data.find((recipe) => recipe._id === id)
        setRecipe(filteredRecipe)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    }

    fetchRecipe()
  }, [id])

  if (!recipe) {
    return <div>Loading...</div>
  }

  const canModify = user && recipe.userId === user.id
  return (
    <div className="recipes-details">
      <h2>Recipe Details</h2>
      <div className="left-section">
        <div className="img-container">
          <img src={recipe.image} alt="Recipe" />
        </div>
      </div>
      <div className="right-section">
        <div className="input-container">
          <label>Recipe Name</label>
          <div>{recipe.name}</div>
        </div>
        <div className="input-container">
          <label>Ingredients</label>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
              >{`${ingredient.itemName}: ${ingredient.amount}`}</li>
            ))}
          </ul>
        </div>
        <div className="input-container">
          <label>Steps</label>
          <div>{recipe.steps}</div>
        </div>
        <Review user={user} />
        {canModify && (
          <div className="edit-delete-buttons">
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
            <Link to={`/editRecipe/${recipe._id}`}>
              <button>Edit</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeDetails
