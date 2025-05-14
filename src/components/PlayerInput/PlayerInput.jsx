// src/components/PlayerInput/PlayerInput.jsx
import React, { useState, useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import { DIFFICULTY_LEVELS, GAME_MODES } from '../../constants/gameSettings';
import './PlayerInput.css';

const PlayerInput = () => {
  const { startGame } = useContext(GameContext);
  
  const [player1, setPlayer1] = useState({
    name: '',
    avatar: 1
  });
  
  const [player2, setPlayer2] = useState({
    name: '',
    avatar: 2
  });
  
  const [gameOptions, setGameOptions] = useState({
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
    gameMode: GAME_MODES.CLASSIC
  });
  
  const handlePlayer1Change = (e) => {
    setPlayer1({
      ...player1,
      name: e.target.value
    });
  };
  
  const handlePlayer2Change = (e) => {
    setPlayer2({
      ...player2,
      name: e.target.value
    });
  };
  
  const handleAvatarSelect = (player, avatarId) => {
    if (player === 1) {
      setPlayer1({
        ...player1,
        avatar: avatarId
      });
    } else {
      setPlayer2({
        ...player2,
        avatar: avatarId
      });
    }
  };
  
  const handleDifficultyChange = (e) => {
    setGameOptions({
      ...gameOptions,
      difficulty: e.target.value
    });
  };
  
  const handleGameModeChange = (e) => {
    setGameOptions({
      ...gameOptions,
      gameMode: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Use default names if none provided
    const p1Name = player1.name.trim() || `Player 1`;
    const p2Name = player2.name.trim() || `Player 2`;
    
    startGame({
      player1Name: p1Name,
      player2Name: p2Name,
      player1Avatar: player1.avatar,
      player2Avatar: player2.avatar,
      difficulty: gameOptions.difficulty,
      gameMode: gameOptions.gameMode
    });
  };
  
  const isFormValid = () => {
    // Basic validation - can customize based on requirements
    return (player1.name !== player2.name) || (player1.name === '' && player2.name === '');
  };
  
  return (
    <div className="player-input-container">
      <div className="player-input-header">
        <h2>Player Setup</h2>
        <p>Enter player names and select game options</p>
      </div>
      
      <form className="player-input-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="player1-name">Player 1 Name</label>
          <input
            type="text"
            id="player1-name"
            className="input-field"
            value={player1.name}
            onChange={handlePlayer1Change}
            placeholder="Enter name (optional)"
            maxLength={15}
            aria-label="Player 1 name"
          />
          
          <div className="player-avatars">
            {[1, 2, 3, 4].map(avatarId => (
              <div
                key={`p1-avatar-${avatarId}`}
                className={`avatar-option ${player1.avatar === avatarId ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect(1, avatarId)}
                aria-label={`Player 1 avatar option ${avatarId}`}
                role="button"
                tabIndex={0}
              >
                {avatarId}
              </div>
            ))}
          </div>
        </div>
        
        <div className="input-group">
          <label htmlFor="player2-name">Player 2 Name</label>
          <input
            type="text"
            id="player2-name"
            className="input-field"
            value={player2.name}
            onChange={handlePlayer2Change}
            placeholder="Enter name (optional)"
            maxLength={15}
            aria-label="Player 2 name"
          />
          
          <div className="player-avatars">
            {[1, 2, 3, 4].map(avatarId => (
              <div
                key={`p2-avatar-${avatarId}`}
                className={`avatar-option ${player2.avatar === avatarId ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect(2, avatarId)}
                aria-label={`Player 2 avatar option ${avatarId}`}
                role="button"
                tabIndex={0}
              >
                {avatarId}
              </div>
            ))}
          </div>
        </div>
        
        <div className="game-options">
          <div className="options-title">Game Options</div>
          <div className="options-grid">
            <div className="input-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                className="input-field"
                value={gameOptions.difficulty}
                onChange={handleDifficultyChange}
                aria-label="Game difficulty"
              >
                <option value={DIFFICULTY_LEVELS.EASY}>Easy</option>
                <option value={DIFFICULTY_LEVELS.MEDIUM}>Medium</option>
                <option value={DIFFICULTY_LEVELS.HARD}>Hard</option>
                <option value={DIFFICULTY_LEVELS.EXPERT}>Expert</option>
              </select>
            </div>
            
            <div className="input-group">
              <label htmlFor="gameMode">Game Mode</label>
              <select
                id="gameMode"
                className="input-field"
                value={gameOptions.gameMode}
                onChange={handleGameModeChange}
                aria-label="Game mode"
              >
                <option value={GAME_MODES.CLASSIC}>Classic</option>
                <option value={GAME_MODES.TIMED}>Timed</option>
                <option value={GAME_MODES.CHALLENGE}>Challenge</option>
                <option value={GAME_MODES.ENDLESS}>Endless</option>
              </select>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="submit-button"
          disabled={!isFormValid()}
          aria-label="Start game"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerInput;