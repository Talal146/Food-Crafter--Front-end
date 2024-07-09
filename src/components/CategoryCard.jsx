import '../App.css'
import { Link } from 'react-router-dom'

const CategoryCard = ({ name, image, id }) => {
  return (
    <Link to={`/recipesList/${id}`}>
      <div className="category-card" id={id}>
        <img src={image} alt={name} height="150px" />
        <h4 className="category-title">{name}</h4>
      </div>
    </Link>
  )
}

export default CategoryCard
