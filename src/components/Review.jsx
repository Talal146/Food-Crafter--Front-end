import '../App.css'
import axios from 'axios'
import Client, { BASE_URL } from '../services/api'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const Review = ({user}) => {
  // const [userId, setUserId] = useState(null)
  const { recipeId } = useParams()

  const [review, setReview] = useState({
    comment: ''
  })
  // const handleReviews = async (e) => {
  //   e.preventDefault()
  //   const response = e.target.value,
  //     setReviews = [response, ...reviews]
  //   setUserId = useParams().userId
  // }
// hundle submit
// return form
// post axios call to create review

return (
    <>
      {/* <h1>{user}?</h1> */}
    </>
  )
}
export default Review
