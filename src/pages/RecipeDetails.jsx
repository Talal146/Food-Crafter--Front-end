import '../App.css'


const RecipesDetails = () => {


  return (
    <div className="recipes-details">
      Recipes details
      <div className='left-section'>
        <div className='img-container'>
          <img src='' />
        </div>
      </div>
      
      
      <div className='right-section'>
        <div className="input-container">
          <label>recipe name</label>
          <div></div>
        </div>
        <div className="input-container">
          <label>Ingredients</label>
        </div>
        <div className="input-container">
          <label>Steps</label>
        </div>
      </div>
    </div>
  )
}

export default RecipesDetails