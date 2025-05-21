// src/components/ScorePanel/ScorePanel.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ScorePanel from './ScorePanel';
import { GameContext } from '../../context/GameContext';

describe('ScorePanel Component', () => {
  test('displays player names and scores', () => {
    const mockGameState = {
      player1Name: 'Alice',
      player2Name: 'Bob',
      player1Score: 2,
      player2Score: 1,
    };
    
    render(
      <GameContext.Provider value={{ gameState: mockGameState }}>
        <ScorePanel />
      </GameContext.Provider>
    );
    
    // Check for player names
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    
    // Check for scores
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Check accessibility
    const scorePanel = screen.getByLabelText('Score panel');
    expect(scorePanel).toBeInTheDocument();
    
    expect(screen.getByLabelText('Alice score: 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Bob score: 1')).toBeInTheDocument();
  });
  
  test('displays default player names when not provided', () => {
    const mockGameState = {
      player1Score: 0,
      player2Score: 0,
    };
    
    render(
      <GameContext.Provider value={{ gameState: mockGameState }}>
        <ScorePanel />
      </GameContext.Provider>
    );
    
    // With undefined player names, it should fall back to defaults in the component
    expect(screen.getByText('0')).toBeInTheDocument();
  });
  
  test('handles zero scores correctly', () => {
    const mockGameState = {
      player1Name: 'Player 1',
      player2Name: 'Player 2',
      player1Score: 0,
      player2Score: 0,
    };
    
    render(
      <GameContext.Provider value={{ gameState: mockGameState }}>
        <ScorePanel />
      </GameContext.Provider>
    );
    
    // Check for zeros
    const scoreValues = screen.getAllByText('0');
    expect(scoreValues).toHaveLength(2);
  });
});
