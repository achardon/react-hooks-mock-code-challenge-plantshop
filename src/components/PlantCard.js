import React, {useState} from "react";

function PlantCard( {plant, handleDelete, handlePriceEdit} ) {

  const [inStock, setInStock] = useState(true)
  //const [currentPrice, setCurrentPrice] = useState(plant.price)

  function handleClick() {
    setInStock((currentStock) => !currentStock)
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p> Price: 
        <span //contentEditable="true"
        // value={currentPrice}
        // onChange={(e)=> console.log(e.target.value)}
        > {plant.price}</span>
        <button onClick={() => handlePriceEdit(plant)}>Edit Price</button>
      </p>
      
      {inStock ? (
        <button className="primary"
        onClick={handleClick}
        >In Stock</button>
      ) : (
        <button
        onClick={handleClick}
        >Out of Stock</button>
      )}
      <button
      style={{margin: 10}}
      onClick={() => handleDelete(plant.id)}
      >Delete Plant</button>
    </li>
  );
}

export default PlantCard;
