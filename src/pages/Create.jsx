import '../App.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'


const Create = () => {
  let navigate = useNavigate()
  const [userId, setUserId] = useState('')
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) setUserId(storedUserId)
  }, [])

  const initialState = {
    recipeName: '',
    categoryId: '',
    ingredients: '',
    steps: '',
    image: '',
    userId: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Client.post(`/recipes/new/${userId}`, formValues)
    setFormValues(initialState)
    navigate('/myRecipes')
  }





  return (
    <div className="create">
      Create New Recipe
      <form className='create-form' onSubmit={handleSubmit}>

        <div className="input-container">
          <label>recipe name</label>
          <input
           onChange={handleChange}
           type="text"
           name="recipeName"
           value={formValues.recipeName}
           required />
        </div>

        <div className="input-container">
          <label>Ingredients</label>
          <input
           onChange={handleChange}
           type="text"
           name="ingredients"
           value={formValues.ingredients}
           required />
        </div>

        <div className="input-container">
          <label>Steps</label>
          <input
           onChange={handleChange}
           type="text"
           name="steps"
           value={formValues.steps}
           required />
        </div>

        <div className="input-container">
          <label>Image</label>
          <input
           onChange={handleChange}
           type="text"
           name="image"
           value={formValues.image}
           required />
        </div>

        <button
          disabled={
            !formValues.recipeName ||
            !formValues.ingredients ||
            !formValues.steps ||
            !formValues.image
          }
        >
          Create
        </button>
      </form>  
    </div>
  )
}

export default Create