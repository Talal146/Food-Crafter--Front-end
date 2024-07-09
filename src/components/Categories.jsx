import '../App.css'
import CategoryCard from './CategoryCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/api'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`)
        setCategories(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getCategories()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  }

  return (
    <div className="categories">
      <Slider {...settings}>
        {categories.map((category) => (
          <Link key={category._id} to={`/recipesList/${category._id}`}>
            <CategoryCard
              id={category._id}
              name={category.name}
              image={category.image}
            />
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default Categories
