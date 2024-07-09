import '../App.css'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Client, { BASE_URL } from '../services/api'

const EditRecipe = () => {
  let navigate = useNavigate()
  const { id } = useParams()
  const [cata, setCata] = useState([])
  const [formValues, setFormValues] = useState({
    name: '',
    categoryId: '',
    ingredients: [{ itemName: '', amount: '' }],
    steps: '',
    image: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`)
        setCata(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchData()

    const fetchRecipe = async () => {
      try {
        const response = await Client.get(`/recipes`)
        const recipe = response.data.find((recipe) => recipe._id === id)
        setFormValues(recipe)
      } catch (error) {
        console.error('Error fetching recipe:', error)
      }
    }

    fetchRecipe()
  }, [id])

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
      await Client.put(`/recipes/${id}`, formValues)
      navigate(`/myRecipes`)
    } catch (error) {
      console.error('Error updating recipe:', error)
    }
  }

  return (
    <div className="edit">
      <h2>Edit Recipe</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="recipeName"
            value={formValues.name}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="category" className="label-new">
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

        <div className="input-container">
          <label htmlFor="ingredients">Ingredients</label>
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
            Add Ingredient
          </button>
        </div>

        <div className="input-container">
          <label htmlFor="steps">Steps</label>
          <input
            onChange={handleChange}
            type="text"
            name="steps"
            id="steps"
            value={formValues.steps}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="image">Image URL</label>
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
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditRecipe
