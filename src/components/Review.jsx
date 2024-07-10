import '../App.css'
import axios from 'axios'
import Client, { BASE_URL } from '../services/api'

const Review = ({ onDelete, user }) => {
  console.log(user)
  return (
    <>
      <h1>{user}?</h1>
    </>
  )
}
export default Review
