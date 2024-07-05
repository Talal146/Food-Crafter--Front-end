import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from '../src/components/Nav'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Create from './pages/Create'
import RecipesList from './pages/RecipesList'


const App = () => {




  
  return (
    <div className="app">
      <header>
        <Nav/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<Create />} />
          <Route path="/recipesList" element={<RecipesList />} />
        </Routes>
      </main>
    </div>
  )
}

export default App