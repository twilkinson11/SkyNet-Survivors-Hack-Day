// src/context/GameContext.test.jsx
import React, { useContext, useEffect } from 'react';
import { render, act } from '@testing-library/react';
import { GameContext, GameProvider } from './GameContext';

// Mock the generateCardPairs utility
jest.mock('../utils/generateCardPairs', () => ({
  generateCardPairs: jest.fn(() => [
    { id: 'A-1', type: 'A', pairId: 'A' },
    { id: 'A-2', type: 'A', pairId: 'A' },
    { id: 'B-1', type: 'B', pairId: 'B' },
    { id: 'B-2', type: 'B', pairId: 'B' },
    { id: 'C-1', type: 'C', pairId: 'C' },
    { id: 'C-2', type: 'C', pairId: 'C' },
    { id: 'D-1', type: 'D', pairId: 'D' },
    { id: 'D-2', type: 'D', pairId: 'D' },
    { id: 'E-1', type: 'E', pairId: 'E' },
  ]),
}));

// Test component that uses the context
const TestConsumer = ({ onStateChange }) => {
  const { gameState, dispatch } = useContext(GameContext);
  
  useEffect(() => {
    if (onStateChange) {
      onStateChange(gameState, dispatch);
    }
  }, [gameState, dispatch, onStateChange]);
  
  return null;
};

describe('GameContext', () => {
  // Reset localStorage before each test
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  
  test('initializes with correct default state', () => {
    let capturedState;
    
    render(
      <GameProvider player1Name="Player 1" player2Name="Player 2">
        <TestConsumer onStateChange={(state) => { capturedState = state; }} />
      </GameProvider>
    );
    
    expect(capturedState).toBeDefined();
    expect(capturedState.cards).toHaveLength(9);
    expect(capturedState.currentPlayer).toBe(1);
    expect(capturedState.player1Score).toBe(0);
    expect(capturedState.player2Score).toBe(0);
    expect(capturedState.player1Name).toBe('Player 1');
    expect(capturedState.player2Name).toBe('Player 2');
    expect(capturedState.flippedCards).toEqual([]);
    expect(capturedState.matchedPairs).toEqual([]);
    expect(capturedState.isChecking).toBe(false);
    expect(capturedState.gameOver).toBe(false);
    expect(capturedState.winner).toBe(null);
    expect(capturedState.gameHistory).toEqual([]);
  });
  
  test('FLIP_CARD action updates state correctly', () => {
    let capturedState;
    let capturedDispatch;
    
    render(
      <GameProvider player1Name="Player 1" player2Name="Player 2">
        <TestConsumer 
          onStateChange={(state, dispatch) => { 
            capturedState = state; 
            capturedDispatch = dispatch;
          }} 
        />
      </GameProvider>
    );
    
    // Dispatch a flip card action
    act(() => {
      capturedDispatch({ type: 'FLIP_CARD', payload: 'A-1' });
    });
    
    // Check if the card was flipped
    expect(capturedState.flippedCards).toContain('A-1');
    
    // Flip another card
    act(() => {
      capturedDispatch({ type: 'FLIP_CARD', payload: 'A-2' });
    });
    
    // Now should have two flipped cards
    expect(capturedState.flippedCards).toEqual(['A-1', 'A-2']);
    
    // Since two cards are flipped, a check should start
    expect(capturedState.isChecking).toBe(true);
    
    // Advance timers to trigger the CHECK_MATCH action
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // After checking, the cards should be matched and removed from flippedCards
    expect(capturedState.flippedCards).toEqual([]);
    expect(capturedState.matchedPairs).toContain('A');
    expect(capturedState.player1Score).toBe(1); // Player 1 made the match
  });
  
  test('handles non-matching cards correctly', () => {
    let capturedState;
    let capturedDispatch;
    
    render(
      <GameProvider player1Name="Player 1" player2Name="Player 2">
        <TestConsumer 
          onStateChange={(state, dispatch) => { 
            capturedState = state; 
            capturedDispatch = dispatch;
          }} 
        />
      </GameProvider>
    );
    
    // Flip two non-matching cards
    act(() => {
      capturedDispatch({ type: 'FLIP_CARD', payload: 'A-1' });
      capturedDispatch({ type: 'FLIP_CARD', payload: 'B-1' });
    });
    
    // Advance timers to trigger the CHECK_MATCH action
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Cards should not be matched, flippedCards should be empty,
    // and currentPlayer should switch to player 2
    expect(capturedState.flippedCards).toEqual([]);
    expect(capturedState.matchedPairs).toEqual([]);
    expect(capturedState.currentPlayer).toBe(2);
  });
  
  test('game completes when all pairs are matched', () => {
    let capturedState;
    let capturedDispatch;
    
    render(
      <GameProvider player1Name="Player 1" player2Name="Player 2">
        <TestConsumer 
          onStateChange={(state, dispatch) => { 
            capturedState = state; 
            capturedDispatch = dispatch;
          }} 
        />
      </GameProvider>
    );
    
    // Player 1 matches pair A
    act(() => {
      capturedDispatch({ type: 'FLIP_CARD', payload: 'A-1' });
      capturedDispatch({ type: 'FLIP_CARD', payload: 'A-2' });
      jest.advanceTimersByTime(1000);
    });
    
    // Player 1 matches pair B
    act(() => {
      capturedDispatch({ type: 'FLIP_CARD', payload: 'B-1' });
      capturedDispatch({ type: 'FLIP_CARD', payload: 'B-2' });
      jest.advanceTimersByTime(1000);
    });
    
    // Player 1 matches pair C
    act(() => {
      capturedDispatch({ type: 'FLIP_CARD', payload: 'C-1' });
      capturedDispatch({ type: 'FLIP_CARD', payload: 'C-2' });
      jest.advanceTimersByTime(1000);
    });
    
    // Player 1 matches the last pair D
    act(() => {
      capturedDispatch({ type: 'FLIP_CARD', payload: 'D-1' });
      capturedDispatch({ type: 'FLIP_CARD', payload: 'D-2' });
      jest.advanceTimersByTime(1000);
    });
    
    // Game should be over and player 1 should be the winner
    expect(capturedState.gameOver).toBe(true);
    expect(capturedState.winner).toBe(1);
    expect(capturedState.player1Score).toBe(4);
    expect(capturedState.player2Score).toBe(0);
    expect(capturedState.gameHistory).toHaveLength(1);
    expect(capturedState.gameHistory[0].winner).toBe(1);
  });
  
  test('RESET_GAME action resets the game state', () => {
    let capturedState;
    let capturedDispatch;
    
    render(
      <GameProvider player1Name="Player 1" player2Name="Player 2">
        <TestConsumer 
          onStateChange={(state, dispatch) => { 
            capturedState = state; 
            capturedDispatch = dispatch;
          }} 
        />
      </GameProvider>
    );
    
    // Make some moves
    act(() => {
      capturedDispatch({ type: 'FLIP_CARD', payload: 'A-1' });
      capturedDispatch({ type: 'FLIP_CARD', payload: 'A-2' });
      jest.advanceTimersByTime(1000);
    });
    
    // Reset the game
    act(() => {
      capturedDispatch({ type: 'RESET_GAME' });
    });
    
    // Check if state was reset
    expect(capturedState.flippedCards).toEqual([]);
    expect(capturedState.matchedPairs).toEqual([]);
    expect(capturedState.player1Score).toBe(0);
    expect(capturedState.player2Score).toBe(0);
    expect(capturedState.currentPlayer).toBe(1);
    expect(capturedState.gameOver).toBe(false);
    expect(capturedState.winner).toBe(null);
    // Player names should be preserved
    expect(capturedState.player1Name).toBe('Player 1');
    expect(capturedState.player2Name).toBe('Player 2');
    // Game history should be preserved
    expect(capturedState.gameHistory).toHaveLength(0);
  });

  test('loads game state from localStorage if available', () => {
    // Setup saved game in localStorage
    const savedGame = {
      cards: [
        { id: 'A-1', type: 'A', pairId: 'A' },
        { id: 'A-2', type: 'A', pairId: 'A' },
      ],
      currentPlayer: 2,
      player1Score: 1,
      player2Score: 0,
      player1Name: 'Old Name',
      player2Name: 'Old Name 2',
      flippedCards: [],
      matchedPairs: ['A'],
      isChecking: false,
      gameOver: false,
      winner: null,
      gameHistory: [],
    };
    
    localStorage.setItem('memoryGameState', JSON.stringify(savedGame));
    
    let capturedState;
    
    render(
      <GameProvider player1Name="New Name" player2Name="New Name 2">
        <TestConsumer onStateChange={(state) => { capturedState = state; }} />
      </GameProvider>
    );
    
    // Should load saved state but update player names
    expect(capturedState.currentPlayer).toBe(2);
    expect(capturedState.player1Score).toBe(1);
    expect(capturedState.matchedPairs).toContain('A');
    // Should update player names with current ones
    expect(capturedState.player1Name).toBe('New Name');
    expect(capturedState.player2Name).toBe('New Name 2');
  });
});
