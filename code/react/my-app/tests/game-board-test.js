// src/components/GameBoard/GameBoard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import GameBoard from './GameBoard';
import { GameContext } from '../../context/GameContext';

// Mock Card component
jest.mock('../Card', () => {
  return function MockCard({ id, type, flipped }) {
    return (
      <div data-testid={`mocked-card-${id}`} data-type={type} data-flipped={flipped}>
        Card Mock
      </div>
    );
  };
});

describe('GameBoard Component', () => {
  const mockCards = [
    { id: 'A-1', type: 'A', pairId: 'A' },
    { id: 'A-2', type: 'A', pairId: 'A' },
    { id: 'B-1', type: 'B', pairId: 'B' },
    { id: 'B-2', type: 'B', pairId: 'B' },
    { id: 'C-1', type: 'C', pairId: 'C' },
    { id: 'C-2', type: 'C', pairId: 'C' },
    { id: 'D-1', type: 'D', pairId: 'D' },
    { id: 'D-2', type: 'D', pairId: 'D' },
    { id: 'E-1', type: 'E', pairId: 'E' },
  ];
  
  const mockGameState = {
    cards: mockCards,
    flippedCards: ['A-1'],
    matchedPairs: ['B'],
  };
  
  test('renders a 3x3 grid with all cards', () => {
    render(
      <GameContext.Provider value={{ gameState: mockGameState }}>
        <GameBoard />
      </GameContext.Provider>
    );
    
    const grid = screen.getByRole('grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute('aria-label', 'Memory game board with 3x3 cards');
    
    // Check if all 9 cards are rendered
    const cells = screen.getAllByRole('gridcell');
    expect(cells).toHaveLength(9);
    
    // Check if each card component received correct props
    mockCards.forEach(card => {
      const cardElement = screen.getByTestId(`mocked-card-${card.id}`);
      expect(cardElement).toBeInTheDocument();
      expect(cardElement).toHaveAttribute('data-type', card.type);
      
      // Check flipped status
      const isFlipped = 
        mockGameState.flippedCards.includes(card.id) || 
        mockGameState.matchedPairs.includes(card.pairId);
      expect(cardElement).toHaveAttribute('data-flipped', isFlipped.toString());
    });
  });
  
  test('passes correct flipped prop to cards', () => {
    render(
      <GameContext.Provider value={{ gameState: mockGameState }}>
        <GameBoard />
      </GameContext.Provider>
    );
    
    // A-1 should be flipped because it's in flippedCards
    const flippedCard = screen.getByTestId('mocked-card-A-1');
    expect(flippedCard).toHaveAttribute('data-flipped', 'true');
    
    // B-1 and B-2 should be flipped because B is in matchedPairs
    const matchedCard1 = screen.getByTestId('mocked-card-B-1');
    const matchedCard2 = screen.getByTestId('mocked-card-B-2');
    expect(matchedCard1).toHaveAttribute('data-flipped', 'true');
    expect(matchedCard2).toHaveAttribute('data-flipped', 'true');
    
    // C-1 should not be flipped
    const unflippedCard = screen.getByTestId('mocked-card-C-1');
    expect(unflippedCard).toHaveAttribute('data-flipped', 'false');
  });
});
