import '../App.css'
import { Link } from "react-router-dom"



const CategoryCard = ({name, image, id}) => {


  return (
   
    <Link to={`/${name}`}>
      <div className="category-card" id={id} key={id}>
        <img src={image} height='150px'/>
        <h4 className='category-title'>{name}</h4>
      </div>
    </Link>  
  )
}

export default CategoryCard