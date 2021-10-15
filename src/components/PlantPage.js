import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState('')

  let plantsToDisplay = [...plants]
  plantsToDisplay = plantsToDisplay.filter(plant => plant.name.includes(search) || plant.name.toLowerCase().includes(search) || plant.name.toUpperCase().includes(search))

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
      <Search 
      search={search}
      setSearch={setSearch}
      />
      <PlantList
      plants={plantsToDisplay}
      />
    </main>
  );
}

export default PlantPage;
