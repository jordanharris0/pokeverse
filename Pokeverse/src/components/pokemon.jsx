import { useState, useEffect } from 'react';
import SearchBar from './search';
import '../styles/PokemonStyle.css';

export default function PokemonComponent({ onCatch, isCaught, squadSize }) {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // api fetch
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pokemon');
        }
        
        const data = await response.json();
        setPokemon(data.results);
        setFilteredPokemon(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // search handler
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPokemon(pokemon);
    } else {
      const filtered = pokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm)
      );
      setFilteredPokemon(filtered);
    }
  };

  // shuffle pokemon array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  if (loading) return <div>Loading pokemon...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pokemon-container">
      <h1 className='pokemon-list-title'>Pokemon List</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="pokemon-grid">
        {shuffleArray(filteredPokemon).map((poke) => {
          const id = pokemon.indexOf(poke) + 1;
          const level = Math.floor(Math.random() * 100) + 1;
          const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const caught = isCaught(poke.name);
          const squadFull = squadSize >= 6;

          const handleCatchClick = () => {
            onCatch({
              name: poke.name,
              id,
              level,
              imgUrl
            });
          };

          return (
            <div key={poke.name} className="pokemon-card">
              <img src={imgUrl} alt={poke.name} className="pokemon-image" />
              <h2 className="pokemon-name">{poke.name}</h2>
              <p className="pokemon-id">Level {level}</p>
              <button 
                className="catch-btn" 
                onClick={handleCatchClick}
                disabled={caught || squadFull}
              >
                {caught ? 'Caught' : 'Catch'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
