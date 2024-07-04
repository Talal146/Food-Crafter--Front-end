import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from '../src/components/Nav'
import Auth from '../src/pages/auth'


const App = () => {




  
  return (
    <div className="app">
      <header>
        <Nav/>
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
    </div>
  )
}

export default App