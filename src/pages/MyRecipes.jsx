import '../App.css'
import RecipeCard from '../components/RecipeCard'
import React, { useEffect, useState } from 'react'
import Client from '../services/api'

const MyRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([])
  const [updateRec, setUpdateRec] = useState(false)
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await Client.get('/recipes')
        setRecipes(response.data)
      } catch (error) {
        console.error('Error Data Fetching:', error)
      }
    }
    fetchRecipes()
  }, [updateRec])
  const userRecipes = recipes.filter((recipe) => recipe.userId === user.id)

  if (!user) {
    return <h3 className="unavailable">Please log in to view your recipes.</h3>
  }

  return (
    <div className="my-recipes">
      {userRecipes.length ? (
        userRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            setUpdateRec={setUpdateRec}
            currentUser={user}
          />
        ))
      ) : (
        <h3 className="unavailable">No recipes yet</h3>
      )}
    </div>
  )
}

export default MyRecipes
