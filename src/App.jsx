import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from '../src/components/Nav'
import Home from './pages/Home'
import Create from './pages/Create'
import RecipesList from './pages/RecipesList'
import Auth from './pages/Auth'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'

const App = () => {




  
  return (
    <div className="app">
      <header>
        <Nav/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/recipesList" element={<RecipesList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/logIn" element={<LogIn />} />
          <Route path="/auth/register" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  )
}

export default App