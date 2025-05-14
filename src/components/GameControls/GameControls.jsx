// src/components/GameControls/GameControls.jsx
import React, { useContext } from 'react';
import './GameControls.css';
import { GameContext } from '../../context/GameContext';

const GameControls = () => {
  const { gameState, restartGame, pauseGame, resumeGame, quitGame } = useContext(GameContext);
  const { isGameActive, isPaused } = gameState;

  return (
    <div className="game-controls" aria-label="Game controls">
      {isGameActive && (
        <>
          <button 
            className="control-button restart" 
            onClick={restartGame}
            aria-label="Restart game"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v6h6"></path>
              <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
            </svg>
            Restart
          </button>
          
          <button 
            className="control-button pause" 
            onClick={isPaused ? resumeGame : pauseGame}
            aria-label={isPaused ? "Resume game" : "Pause game"}
          >
            {isPaused ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Resume
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                Pause
              </>
            )}
          </button>
          
          <button 
            className="control-button quit" 
            onClick={quitGame}
            aria-label="Quit game"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
            Quit
          </button>
        </>
      )}
      
      {!isGameActive && (
        <button 
          className="control-button" 
          onClick={restartGame}
          aria-label="Start new game"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Start New Game
        </button>
      )}
    </div>
  );
};

export default GameControls;