// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import TurnIndicator from './components/TurnIndicator';
import GameControls from './components/GameControls';
import PlayerInput from './components/PlayerInput';
import GameOverModal from './components/GameOverModal';
import Instructions from './components/Instructions';
import { GameProvider } from './context/GameContext';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [player1Name, setPlayer1Name] = useState(localStorage.getItem('player1Name') || 'Player 1');
  const [player2Name, setPlayer2Name] = useState(localStorage.getItem('player2Name') || 'Player 2');

  useEffect(() => {
    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player2Name', player2Name);
  }, [player1Name, player2Name]);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Memory Card Game</h1>
        <button className="instructions-button" onClick={toggleInstructions}>
          {showInstructions ? 'Hide' : 'Show'} Instructions
        </button>
      </header>

      {showInstructions && <Instructions onClose={toggleInstructions} />}

      {!gameStarted ? (
        <div className="setup-container">
          <PlayerInput
            player1Name={player1Name}
            player2Name={player2Name}
            setPlayer1Name={setPlayer1Name}
            setPlayer2Name={setPlayer2Name}
          />
          <button className="start-button" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      ) : (
        <GameProvider player1Name={player1Name} player2Name={player2Name}>
          <div className="game-container">
            <div className="game-info">
              <ScorePanel />
              <TurnIndicator />
            </div>
            <GameBoard />
            <GameControls />
            <GameOverModal />
          </div>
        </GameProvider>
      )}
    </div>
  );
}

export default App;