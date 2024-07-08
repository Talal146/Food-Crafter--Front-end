import '../App.css'
import RecipeCard from '../components/RecipeCard'
import React, { useEffect, useState } from 'react'
import Client from '../services/api'

const MyRecipes = ({ user }) => {
  const [recipe, setRecipes] = useState([])
  const [updateRec, setUpdateRec] = useState(false)

  useEffect(() => {
    const fetchrecipes = async () => {
      try {
        const response = await Client.get(`/recipes`)
        setRecipes(response.data)
      } catch (error) {
        console.error('Error Data Fetching:', error)
      }
    }
    fetchrecipes()
  }, [updateRec])

  const userRecipes = recipe.filter((recipe) => recipe.userId === user.id)
  return (
    <div className="my-recipes">
      {userRecipes.length ? (
        <RecipeCard reservations={userRecipes} setUpdateRes={setUpdateRec} />
      ) : (
        <h3 className="unavailable">No recipes yet</h3>
      )}
    </div>
  )
}

export default MyRecipes
