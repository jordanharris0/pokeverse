

import '../styles/Squad.css';

export default function SquadComponent({ squad, onRelease }) {
  return (
    <>
      <h1 className='mysquad'>My Squad</h1>
      <div className="squad-container">
        {squad.length === 0 ? (
          <p className="empty-squad">Catch Some Pokemon!</p>
        ) : (
          <div className="squad-grid">
            {squad.map((poke) => (
              <div key={poke.name} className="pokemon-card">
                <img src={poke.imgUrl} alt={poke.name} className="pokemon-image" />
                <h2 className="pokemon-name">{poke.name}</h2>
                <p className="pokemon-id">Level {poke.level}</p>
                <button 
                  className="release-btn"
                  onClick={() => onRelease(poke.name)}
                >
                  Release
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}