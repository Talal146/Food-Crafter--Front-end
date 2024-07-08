import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Nav from '../src/components/Nav'
import Home from './pages/Home'
import Create from './pages/Create'
import RecipesList from './pages/RecipesList'
import Auth from './pages/Auth'
import LogIn from './components/SignIn'
import SignUp from './components/Register'
import RecipesDetails from './pages/RecipeDetails'
import MyRecipes from './pages/MyRecipes'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  return (
    <div className="app">
      <header>
        <Nav user={user} handleLogOut={handleLogOut} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recpies/create" element={<Create />} />
          <Route path="/recipesList" element={<RecipesList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/logIn" element={<LogIn setUser={setUser} />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/recipeDetails" element={<RecipesDetails />} />
          <Route path="/myRecipes" element={<MyRecipes />} />
          <Route path="/recipeDetails" element={<RecipesDetails />} />
          <Route path="/myRecipes" element={<MyRecipes />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
