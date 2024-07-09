import '../App.css'

const RecipesDetails = () => {
  // Fetch and display details of the recipe using the URL param (recipe ID)
  return (
    <div className="recipes-details">
      <h2>Recipe Details</h2>
      <div className="left-section">
        <div className="img-container">
          <img src="" alt="Recipe" /> {/* Display recipe image */}
        </div>
      </div>
      <div className="right-section">
        <div className="input-container">
          <label>Recipe Name</label>
          <div>{/* Display recipe name */}</div>
        </div>
        <div className="input-container">
          <label>Ingredients</label>
          <div>{/* Display recipe ingredients */}</div>
        </div>
        <div className="input-container">
          <label>Steps</label>
          <div>{/* Display recipe steps */}</div>
        </div>
      </div>
    </div>
  )
}

export default RecipesDetails
