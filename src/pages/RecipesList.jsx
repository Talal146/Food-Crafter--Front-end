import '../App.css'
import RecipeCard from '../components/RecipeCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../services/api'

const RecipesList = () => {
  const [recipes, setRecipes] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/recipes`)
        const filteredRecipes = res.data.filter(
          (recipe) => recipe.categoryId === id
        )
        setRecipes(filteredRecipes)
      } catch (err) {
        console.log('Error fetching recipes:', err)
      }
    }

    getRecipes()
  }, [id])

  return (
    <div className="recipes-list">
      <h2>Recipes List</h2>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipesList
