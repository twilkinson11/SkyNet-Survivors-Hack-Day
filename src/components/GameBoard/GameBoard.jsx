// src/components/GameBoard/GameBoard.jsx
import React, { useContext } from 'react';
import './GameBoard.css';
import Card from '../Card';
import { GameContext } from '../../context/GameContext';

const GameBoard = () => {
  const { gameState } = useContext(GameContext);
  const { cards, flippedCards, matchedPairs } = gameState;
  
  // Check if a card is flipped or part of a matched pair
  const isCardFlipped = (cardId, cardPairId) => {
    return flippedCards.includes(cardId) || matchedPairs.includes(cardPairId);
  };

  return (
    <div 
      className="game-board"
      role="grid"
      aria-label="Memory game board with 3x3 cards"
    >
      {cards.map((card) => (
        <div key={card.id} className="game-board-cell" role="gridcell">
          <Card
            id={card.id}
            type={card.type}
            flipped={isCardFlipped(card.id, card.pairId)}
          />
        </div>
      ))}
    </div>
  );
};

export default GameBoard;