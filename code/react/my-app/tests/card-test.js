// src/components/Card/Card.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { GameContext } from '../../context/GameContext';

// Mock context
const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  gameState: {
    flippedCards: [],
    matchedPairs: [],
  },
};

describe('Card Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });
  
  test('renders card face down by default', () => {
    render(
      <GameContext.Provider value={mockContextValue}>
        <Card id="A-1" type="A" flipped={false} />
      </GameContext.Provider>
    );
    
    const card = screen.getByTestId('card-A-1');
    expect(card).toBeInTheDocument();
    expect(card).not.toHaveClass('flipped');
    expect(screen.getByText('?')).toBeInTheDocument();
  });
  
  test('renders card face up when flipped', () => {
    render(
      <GameContext.Provider value={mockContextValue}>
        <Card id="A-1" type="A" flipped={true} />
      </GameContext.Provider>
    );
    
    const card = screen.getByTestId('card-A-1');
    expect(card).toHaveClass('flipped');
    expect(screen.getByText('A')).toBeInTheDocument();
  });
  
  test('dispatches FLIP_CARD action when clicked', () => {
    render(
      <GameContext.Provider value={mockContextValue}>
        <Card id="A-1" type="A" flipped={false} />
      </GameContext.Provider>
    );
    
    fireEvent.click(screen.getByTestId('card-A-1'));
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FLIP_CARD',
      payload: 'A-1',
    });
  });
  
  test('is accessible via keyboard', () => {
    render(
      <GameContext.Provider value={mockContextValue}>
        <Card id="A-1" type="A" flipped={false} />
      </GameContext.Provider>
    );
    
    const card = screen.getByTestId('card-A-1');
    
    // Press Enter key
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FLIP_CARD',
      payload: 'A-1',
    });
    
    mockDispatch.mockClear();
    
    // Press Space key
    fireEvent.keyDown(card, { key: ' ' });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FLIP_CARD',
      payload: 'A-1',
    });
  });
  
  test('has correct ARIA attributes', () => {
    render(
      <GameContext.Provider value={mockContextValue}>
        <Card id="A-1" type="A" flipped={false} />
      </GameContext.Provider>
    );
    
    const card = screen.getByTestId('card-A-1');
    expect(card).toHaveAttribute('aria-label', 'Card face down');
    expect(card).toHaveAttribute('aria-pressed', 'false');
    expect(card).toHaveAttribute('role', 'button');
    
    // Render flipped card
    render(
      <GameContext.Provider value={mockContextValue}>
        <Card id="A-1" type="A" flipped={true} />
      </GameContext.Provider>
    );
    
    const flippedCard = screen.getAllByTestId('card-A-1')[1];
    expect(flippedCard).toHaveAttribute('aria-label', 'Card A');
    expect(flippedCard).toHaveAttribute('aria-pressed', 'true');
  });
});
