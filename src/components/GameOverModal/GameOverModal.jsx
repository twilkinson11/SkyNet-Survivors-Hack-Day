// src/components/GameOverModal/GameOverModal.jsx
import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../context/GameContext';
import './GameOverModal.css';

const GameOverModal = () => {
  const { gameState, restartGame, quitGame } = useContext(GameContext);
  const { 
    isGameOver, 
    player1Score, 
    player2Score, 
    player1Name, 
    player2Name,
    turns,
    matchedPairs,
    elapsedTime
  } = gameState;
  
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isGameOver) {
      // Small delay to allow animation to work properly
      setTimeout(() => {
        setVisible(true);
      }, 300);
    } else {
      setVisible(false);
    }
  }, [isGameOver]);
  
  if (!isGameOver) return null;
  
  const winner = player1Score > player2Score ? player1Name : 
                player2Score > player1Score ? player2Name : 'Tie';
  
  // Format time from seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={`game-over-modal-backdrop ${visible ? 'visible' : ''}`}>
      <div className={`game-over-modal ${visible ? 'visible' : ''}`} aria-labelledby="game-over-title">
        <div className="game-over-header">
          <h2 id="game-over-title">Game Over!</h2>
          {winner === 'Tie' ? (
            <p>It's a tie!</p>
          ) : (
            <p>{winner} wins!</p>
          )}
        </div>
        
        <div className="game-results">
          <div className={`result-row ${player1Score >= player2Score ? 'winner' : ''}`}>
            <span className="result-label">{player1Name}</span>
            <span className="result-value">{player1Score} points</span>
          </div>
          <div className={`result-row ${player2Score >= player1Score ? 'winner' : ''}`}>
            <span className="result-label">{player2Name}</span>
            <span className="result-value">{player2Score} points</span>
          </div>
        </div>
        
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-value">{turns}</span>
            <span className="stat-label">Turns</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{matchedPairs}</span>
            <span className="stat-label">Pairs</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{formatTime(elapsedTime)}</span>
            <span className="stat-label">Time</span>
          </div>
        </div>
        
        <div className="game-over-actions">
          <button 
            className="action-button play-again" 
            onClick={restartGame}
            aria-label="Play again"
          >
            Play Again
          </button>
          <button 
            className="action-button main-menu" 
            onClick={quitGame}
            aria-label="Return to main menu"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;