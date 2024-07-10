import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api'

const CreateReview = ({ user, recipeId, refreshReviews }) => {
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
      setReview({ comment: '', recipeId: recipeId, userId: user.id }) // Clear the form
      refreshReviews() // Refresh the review list
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

export default CreateReview
