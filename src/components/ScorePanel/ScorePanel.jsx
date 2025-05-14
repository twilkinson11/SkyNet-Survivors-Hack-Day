// src/components/ScorePanel/ScorePanel.jsx
import React, { useContext } from 'react';
import './ScorePanel.css';
import { GameContext } from '../../context/GameContext';

const ScorePanel = () => {
  const { gameState } = useContext(GameContext);
  const { 
    player1Score, 
    player2Score, 
    player1Name, 
    player2Name 
  } = gameState;

  return (
    <div className="score-panel" aria-label="Score panel">
      <div 
        className="player-score"
        aria-label={`${player1Name} score: ${player1Score}`}
      >
        <span className="player-name">{player1Name}</span>
        <span className="player-score-value">{player1Score}</span>
      </div>
      <div 
        className="player-score"
        aria-label={`${player2Name} score: ${player2Score}`}
      >
        <span className="player-name">{player2Name}</span>
        <span className="player-score-value">{player2Score}</span>
      </div>
    </div>
  );
};

export default ScorePanel;