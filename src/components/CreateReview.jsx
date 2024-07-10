import React, { useState } from 'react'
import Client from '../services/api'

const Review = ({ user, recipeId }) => {
  console.log('Recipe ID:', recipeId) // This should log the correct recipeId

  const [review, setReview] = useState({
    comment: '',
    recipeId: recipeId,
    userId: user.id
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await Client.post(`/reviews`, review, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    } catch (error) {
      console.error('Error creating review:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Comment</label>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Review
