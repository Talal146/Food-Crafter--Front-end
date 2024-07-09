import '../App.css'
import CategoryCard from './CategoryCard'
import { useEffect, useState } from "react"
import axios from "axios"


import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"



const Categories = () => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      let res = await axios.get("http://localhost:3001/categories")
      setCategories(res.data)
      console.log()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
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
      {categories.map((Category) => (
          <CategoryCard
            key={Category._id}
            id={Category._id}
            name={Category.name}
            image={Category.image}
          />
      ))}
      </Slider>
    </div>
  )
}

export default Categories