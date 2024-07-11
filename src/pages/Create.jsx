import '../App.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client, { BASE_URL } from '../services/api'
import axios from 'axios'

const Create = () => {
  let navigate = useNavigate()
  const [usersId, setUsersId] = useState('')
  const [cata, setCata] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`)
        setCata(response.data)
      } catch (error) {
        console.error('Error Fetching Categories:', error)
      }
    }

    fetchData()

    const storedUserId = localStorage.getItem('usersId')
    if (storedUserId) {
      setUsersId(storedUserId)
      setFormValues((prevState) => ({ ...prevState, userId: storedUserId }))
    }
  }, [])

  const initialState = {
    name: '',
    categoryId: '',
    ingredients: [{ itemName: '', amount: '' }],
    steps: '',
    image: '',
    userId: usersId
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    const [field, index] = name.split('-')
    if (field === 'itemName' || field === 'amount') {
      const newIngredients = [...formValues.ingredients]
      newIngredients[index][field] = value
      setFormValues({ ...formValues, ingredients: newIngredients })
    } else {
      setFormValues({ ...formValues, [name]: value })
    }
  }

  const addIngredient = () => {
    setFormValues({
      ...formValues,
      ingredients: [...formValues.ingredients, { itemName: '', amount: '' }]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await Client.post(`/recipes`, formValues)
      setFormValues(initialState)
      navigate('/myRecipes')
    } catch (error) {
      console.error('Error creating recipe:', error)
    }
  }

  return (
    <div className="create">
      <h2>Create New Recipe</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="recipeName" className='input-label'>Recipe Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="recipeName"
            value={formValues.name}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="category" className="input-label">
            Category
          </label>
          <select
            name="categoryId"
            id="category"
            className="input-form"
            value={formValues.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {cata.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-wrapper">
          <label htmlFor="ingredients" className='input-label'>Ingredients</label>
          {formValues.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                name={`itemName-${index}`}
                placeholder="Ingredient Name"
                value={ingredient.itemName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name={`amount-${index}`}
                placeholder="Amount"
                value={ingredient.amount}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Add Ingr
          </button>
        </div>

        <div className="input-wrapper">
          <label htmlFor="steps" className='input-label'>Steps</label>
          <input
            onChange={handleChange}
            type="text"
            name="steps"
            id="steps"
            value={formValues.steps}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="image" className='input-label'>Image URL</label>
          <input
            onChange={handleChange}
            type="text"
            name="image"
            id="image"
            value={formValues.image}
            required
          />
        </div>

        <button
          type="submit"
          disabled={
            !formValues.name ||
            !formValues.categoryId ||
            !formValues.ingredients.length ||
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
