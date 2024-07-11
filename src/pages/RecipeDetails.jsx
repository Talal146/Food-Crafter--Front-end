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
          <h1>{recipe.name}</h1>


    <div className='med-section'>

    <div className="img-container">
          <img src={recipe.image} alt="Recipe" height='300px' />
      </div>

      <div className='left-section'>
        <div className="ingredients-container">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
              >{`${ingredient.itemName}: ${ingredient.amount}`}</li>
            ))}
          </ul>
        </div>

        <div className="steps-container">
          <h3>Steps</h3>
          <h5>{recipe.steps}</h5>
        </div>
      </div>


      
    </div>

    
    <div className='revew-section'>

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
