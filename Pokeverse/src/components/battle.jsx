

import '../styles/Battle.css';

export default function BattleComponent({ squad, onExitBattle }) {
  // Placeholder data
  const activePokemon = squad[0] || {
    name: 'Pikachu',
    type: 'Electric'
  };

  const moves = [
    { name: 'Thunderbolt', pp: 15, maxPp: 30 },
    { name: 'Quick Attack', pp: 30, maxPp: 30 },
    { name: 'Thunder', pp: 8, maxPp: 15 },
    { name: 'Agility', pp: 15, maxPp: 30 }
  ];

  return (
    <div className="battle-container">
      <h1>Battle!</h1>
      <button className="exit-battle-btn" onClick={onExitBattle}>Exit Battle</button>
      
      {/* Battle Footer */}
      <div className="battle-footer">
        {/* Left Box - Moves */}
        <div className="battle-footer-left">
          <div className="moves-grid">
            {moves.map((move, index) => (
              <div key={index} className="move-button">
                {move.name}
              </div>
            ))}
          </div>
        </div>

        {/* Right Box - Stats */}
        <div className="battle-footer-right">
          <div className="stats-top">
            <div className="pp-stat">
              <span className="pp-value">{moves[0].pp}/{moves[0].maxPp}</span>
              <span className="pp-label">PP</span>
            </div>
            <div className="pp-stat">
              <span className="pp-value">{moves[1].pp}/{moves[1].maxPp}</span>
              <span className="pp-label">PP</span>
            </div>
          </div>
          <div className="stats-bottom">
            <div className="type-stat">
              <span className="type-label">Type:</span>
              <span className="type-value">{activePokemon.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}