import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onFindPetsClick() {
    if(filters.type === "all") {
      fetch("http://localhost:3001/pets")
      .then(r => r.json())
      .then(d => setPets(d))
    } else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(r => r.json())
      .then(d => setPets(d))
    }
  }

  function onAdoptPet(id) {
    setPets(pets.map(pet => {
      if (pet.id === id) {
        return { ...pet, isAdopted: true }
      } else {
        return { ...pet }
      }
    }))
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
              filters={filters} 
              onChangeType={e => setFilters({...filters, type: e.target.value})} 
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
