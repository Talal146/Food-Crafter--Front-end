import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Client, { BASE_URL } from '../services/api'
import Confirm from './Confirm'

const ReviewList = ({ recipeId, user }) => {
  const [reviews, setReviews] = useState([])
  const [editingReview, setEditingReview] = useState(null)
  const [editComment, setEditComment] = useState('')
  const [deleteReviewId, setDeleteReviewId] = useState(null)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/reviews/all_reviews/${recipeId}`
        )
        setReviews(response.data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [recipeId])

  const handleDelete = (reviewId) => {
    setDeleteReviewId(reviewId)
    setIsConfirmationOpen(true)
  }

  const confirmDelete = async () => {
    try {
      await Client.delete(`/reviews/${deleteReviewId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setReviews(reviews.filter((review) => review._id !== deleteReviewId))
      setIsConfirmationOpen(false)
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const handleEdit = (review) => {
    setEditingReview(review)
    setEditComment(review.comment)
  }

  const handleUpdate = async (reviewId) => {
    try {
      await Client.put(
        `/reviews/${reviewId}`,
        { comment: editComment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      setReviews(
        reviews.map((review) =>
          review._id === reviewId ? { ...review, comment: editComment } : review
        )
      )
      setEditingReview(null)
    } catch (error) {
      console.error('Error updating review:', error)
    }
  }

  const cancelDelete = () => {
    setIsConfirmationOpen(false)
    setDeleteReviewId(null)
  }

  return (
    <div className="review-list">
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review">
            {editingReview && editingReview._id === review._id ? (
              <>
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <button onClick={() => handleUpdate(review._id)}>Update</button>
                <button onClick={() => setEditingReview(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{review.comment}</p>
                {user && review.userId === user.id && (
                  <div>
                    <button onClick={() => handleEdit(review)}>Edit</button>
                    <button onClick={() => handleDelete(review._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      <Confirm
        isOpen={isConfirmationOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default ReviewList
