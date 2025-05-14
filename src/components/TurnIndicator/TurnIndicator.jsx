import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import './TurnIndicator.css';

const TurnIndicator = () => {
  const { state } = useContext(GameContext);
  const currentPlayer = state.players[state.currentPlayerIndex];
  
  // Only show turn indicator during active gameplay
  if (state.gameState !== 'PLAYING') {
    return null;
  }
  
  return (
    <div className="turn-indicator">
      <h2>Current Turn</h2>
      <div className="current-player-indicator">
        <div className="player-avatar">
          {currentPlayer.name.charAt(0).toUpperCase()}
        </div>
        <div className="player-info">
          <div className="turn-player-name">{currentPlayer.name}'s turn</div>
          <div className="turn-instruction">Select two cards to match</div>
        </div>
      </div>
      
      {/* Visual indicator for how many cards are flipped */}
      <div className="flip-status">
        <div className={`flip-indicator ${state.flippedCards.length > 0 ? 'flipped' : ''}`}>1</div>
        <div className={`flip-indicator ${state.flippedCards.length > 1 ? 'flipped' : ''}`}>2</div>
      </div>
    </div>
  );
};

export default TurnIndicator;