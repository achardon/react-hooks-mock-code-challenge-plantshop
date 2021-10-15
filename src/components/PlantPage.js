import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])

  console.log(plants)

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(r => r.json())
    .then(data => {
      setPlants((currentPlants) => data)
    })
  }, [])

  function onAddPlant(newPlant) {
    fetch('http://localhost:6001/plants', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlant)
    })
    .then(r => r.json())
    .then(data => {
      setPlants((currentPlant) => [...plants, {
        ...data, id: data.id
      }])
    })
  }

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant}/>
      <Search />
      <PlantList
      plants={plants}
      />
    </main>
  );
}

export default PlantPage;
