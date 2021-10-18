import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState('')
  const [newPlant, setNewPlant] = useState({
    name: '',
    price: '',
    image: ''
  })

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
    console.log(newPlant)
    
    const indexOfPlant = plants.findIndex((plantInArray) => plantInArray.id === newPlant.id)
    console.log(indexOfPlant)
    if(indexOfPlant !== -1) {
      console.log('plant already exists')
      const copyOfPlants = [...plants]
      copyOfPlants.splice(indexOfPlant, 1, newPlant)
      console.log(copyOfPlants)

      fetch(`http://localhost:6001/plants/${newPlant.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlant)
      })
      .then(r => r.json())
      .then(data => {
        setPlants((currentPlants) => copyOfPlants)
        console.log(data)
      })

    }
    else {
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
  }

  function handleDelete(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    setPlants(plants.filter(plant => plant.id !== id))
  }

  function handlePriceEdit(plant) {
    console.log(plant)
    setNewPlant(plant)
  }

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} newPlant={newPlant} setNewPlant={setNewPlant}/>
      <Search 
      search={search}
      setSearch={setSearch}
      />
      <PlantList
      plants={plantsToDisplay}
      handleDelete={handleDelete}
      handlePriceEdit={handlePriceEdit}
      />
    </main>
  );
}

export default PlantPage;
