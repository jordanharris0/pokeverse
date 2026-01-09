import { useState } from 'react'
import './App.css'
import PokemonComponent from './components/pokemon.jsx'
import SquadComponent from './components/squad.jsx'

function App() {
  const [squad, setSquad] = useState([]);

  const handleCatch = (pokemonData) => {
    if (squad.length < 6) {
      setSquad([...squad, pokemonData]);
    }
  };

  const handleRelease = (pokemonName) => {
    setSquad(squad.filter((poke) => poke.name !== pokemonName));
  };

  const isCaught = (pokemonName) => {
    return squad.some((poke) => poke.name === pokemonName);
  };

  return (
    <>
    <h1>Pokeverse</h1>
      <div>
        <SquadComponent squad={squad} onRelease={handleRelease} />
        <PokemonComponent 
          onCatch={handleCatch} 
          isCaught={isCaught}
          squadSize={squad.length}
        />
      </div>
    </>
  )
}

export default App
