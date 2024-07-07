import '../App.css'


const Create = () => {


  return (
    <div className="create">
      Create New Recipe
      <form className='create-form'>
        <div className="input-container">
          <label>recipe name</label>
          <input type="text" required />
        </div>
        <div className="input-container">
          <label>Ingredients</label>
          <input type="text" required />
        </div>
        <div className="input-container">
          <label>Steps</label>
          <input type="text" required />
        </div>
        <div className="input-container">
          <label>Image</label>
          <input type="text" required />
        </div>
        <button type='submit'>
            Create
          </button>
      </form>  
    </div>
  )
}

export default Create