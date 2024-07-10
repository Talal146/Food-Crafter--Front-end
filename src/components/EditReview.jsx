import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import Client, { BASE_URL } from '../services/api'

const EditRecipe = ({ user }) => {
  const { id } = useParams()
  const history = useHistory()
  const [recipe, setRecipe] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    ingredients: '',
    steps: '',
    image: ''
  })
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    comment: ''
  })

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/recipes/${id}`)
        const recipe = response.data
        setRecipe(recipe)
        setFormData({
          name: recipe.name,
          categoryId: recipe.categoryId,
          ingredients: recipe.ingredients
            .map((ing) => `${ing.itemName}: ${ing.amount}`)
            .join(', '),
          steps: recipe.steps,
          image: recipe.image
        })
      } catch (error) {
        console.error('Error fetching recipe:', error)
      }
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/reviews/all_reviews/${id}`
        )
        setReviews(response.data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchRecipe()
    fetchReviews()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ingredientsArray = formData.ingredients.split(',').map((ing) => {
      const [itemName, amount] = ing.split(':').map((str) => str.trim())
      return { itemName, amount }
    })
    try {
      await Client.put(`/recipes/${id}`, {
        ...formData,
        ingredients: ingredientsArray
      })
      history.push(`/recipes/${id}`)
    } catch (error) {
      console.error('Error updating recipe:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await Client.delete(`/recipes/${id}`)
      history.push('/myRecipes')
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }

  const handleReviewChange = (e) => {
    const { name, value } = e.target
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value
    }))
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      await Client.post(`/reviews`, { ...newReview, recipeId: id })
      setNewReview({ comment: '' })
      const response = await axios.get(`${BASE_URL}/reviews/all_reviews/${id}`)
      setReviews(response.data)
    } catch (error) {
      console.error('Error creating review:', error)
    }
  }

  const handleReviewDelete = async (reviewId) => {
    try {
      await Client.delete(`/reviews/${reviewId}`)
      const response = await axios.get(`${BASE_URL}/reviews/all_reviews/${id}`)
      setReviews(response.data)
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  if (!recipe) {
    return <div>Loading...</div>
  }

  return (
    <div className="edit-recipe">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Recipe Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label>Category ID</label>
          <input
            type="text"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label>Ingredients (format: itemName: amount)</label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label>Steps</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
      <div className="reviews-section">
        <h3>Reviews</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className="input-container">
            <label>Comment</label>
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleReviewChange}
            />
          </div>
          <button type="submit">Add Review</button>
        </form>
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>{review.comment}</p>
              {user && user.id === review.userId && (
                <button onClick={() => handleReviewDelete(review._id)}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EditRecipe
