import { useState } from 'react'
import './App.css'
import PokemonComponent from './components/pokemon.jsx'
import SquadComponent from './components/squad.jsx'
import BattleComponent from './components/battle.jsx'
import pokeball from '../public/pokeball.png'

function App() {
  const [squad, setSquad] = useState([]);
  const [isBattleMode, setIsBattleMode] = useState(false);

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

  const handleBattle = () => {
    setIsBattleMode(true);
  };

  return (
    <>
    <h1 className='title'>Pokeverse <img src={pokeball} alt="Pokeball" /></h1>
      <div>
        {!isBattleMode ? (
          <>
            <SquadComponent squad={squad} onRelease={handleRelease} />
            {squad.length === 6 && (
              <div className="battle-button-container">
                <button className="battle-button" onClick={handleBattle}>
                  Battle!
                </button>
              </div>
            )}
            <PokemonComponent 
              onCatch={handleCatch} 
              isCaught={isCaught}
              squadSize={squad.length}
            />
          </>
        ) : (
          <BattleComponent squad={squad} onExitBattle={() => setIsBattleMode(false)} />
        )}
      </div>
    </>
  )
}

export default App
