import '../App.css'
import { Link } from "react-router-dom"

const CategoryCard = ({name, image, id}) => {


  return (

    <Link to={`/${name}`}>
      <div className="category-card" id={id} key={id}>
        category card
        <img src={image}/>
        <h2 className='category-title'>{name}</h2>
        
      </div>
    </Link>  
  )
}

export default CategoryCard