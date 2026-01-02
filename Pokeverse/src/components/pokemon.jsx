import { useState, useEffect } from 'react';

export default function PokemonComponent() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <div>Loading pokemon...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemon.map((poke, index) => {
          const id = index + 1; // because limit=151 starts at Bulbasaur
          const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <li key={poke.name}>
              {poke.name} <img src={imgUrl} alt={poke.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
