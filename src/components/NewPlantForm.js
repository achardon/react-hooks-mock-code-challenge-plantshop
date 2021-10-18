
function NewPlantForm( {onAddPlant, newPlant, setNewPlant} ) {

  // const [newPlant, setNewPlant] = useState({
  //   name: '',
  //   price: '',
  //   image: ''
  // })
  
  function handleChange(e) {
    setNewPlant({...newPlant,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlant(newPlant)
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={newPlant.name}onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={newPlant.image}onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={newPlant.price} onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
