import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'

const EditReview = ({ user }) => {
  const { reviewId } = useParams()
  const navigate = useNavigate()
  const [review, setReview] = useState({
    comment: ''
  })

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await Client.get(`/reviews/${reviewId}`)
        if (response.data.userId !== user.id) {
          navigate('/')
        } else {
          setReview(response.data)
        }
      } catch (error) {
        console.error('Error fetching review:', error)
      }
    }

    fetchReview()
  }, [reviewId, user.id, navigate])

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
      await Client.put(`/reviews/${reviewId}`, review)
      navigate(`/recipes/${review.recipeId}`)
    } catch (error) {
      console.error('Error updating review:', error)
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
      <button type="submit">Save</button>
    </form>
  )
}

export default EditReview
