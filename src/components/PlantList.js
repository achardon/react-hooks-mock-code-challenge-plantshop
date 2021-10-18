import React from "react";
import PlantCard from "./PlantCard";

function PlantList( {plants, handleDelete, handlePriceEdit} ) {
  return (
    <ul className="cards">{plants.map(plant => <PlantCard key={plant.id} plant = {plant} handleDelete={handleDelete} handlePriceEdit={handlePriceEdit}/>)}</ul>
  );
}

export default PlantList;
