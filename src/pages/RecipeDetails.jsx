import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { BASE_URL } from '../services/api'
import CreateReview from '../components/CreateReview'
import ReviewList from './ReviewList'

const RecipeDetails = ({ user }) => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [reviews, setReviews] = useState([])

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

  const refreshReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/all_reviews/${id}`)
      setReviews(response.data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  useEffect(() => {
    refreshReviews()
  }, [id])

  if (!recipe) {
    return <div>Loading...</div>
  }

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
        <CreateReview
          user={user}
          recipeId={id}
          refreshReviews={refreshReviews}
        />
        <ReviewList recipeId={id} user={user} />
      </div>
    </div>
  )
}

export default RecipeDetails
