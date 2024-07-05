import '../App.css'
import { Link } from "react-router-dom"

const CategoryCard = () => {


  return (
    <Link to={`/recipesList`}>
      <div className="category-card">
        category card
      </div>
    </Link>
  )
}

export default CategoryCard