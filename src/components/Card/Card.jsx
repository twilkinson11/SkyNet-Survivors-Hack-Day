// src/components/Card/Card.jsx
import React, { useContext } from 'react';
import './Card.css';
import { GameContext } from '../../context/GameContext';

const Card = ({ id, type, flipped }) => {
  const { dispatch } = useContext(GameContext);

  const handleClick = () => {
    // Dispatch action to flip card
    dispatch({ type: 'FLIP_CARD', payload: id });
  };

  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={handleClick}
      data-testid={`card-${id}`}
      aria-label={flipped ? `Card ${type}` : 'Card face down'}
      aria-pressed={flipped}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
          e.preventDefault();
        }
      }}
    >
      <div className="card-inner">
        <div className="card-front" aria-hidden={!flipped}>
          {/* Card back design */}
          <div className="card-back-design">?</div>
        </div>
        <div className="card-back" aria-hidden={flipped}>
          {/* Card content */}
          <div className="card-content">{type}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;