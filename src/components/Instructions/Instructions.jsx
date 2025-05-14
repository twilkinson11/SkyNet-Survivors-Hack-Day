// src/components/Instructions/Instructions.jsx
import React, { useState } from 'react';
import './Instructions.css';
import { CARD_TYPES, SPECIAL_CARD_ABILITIES } from '../../constants/cardTypes';

const Instructions = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleInstructions = () => {
    setIsOpen(!isOpen);
  };
  
  if (!isOpen) {
    return (
      <button 
        className="toggle-instructions" 
        onClick={toggleInstructions}
        aria-expanded="false"
        aria-controls="instructions-content"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        How to Play
      </button>
    );
  }
  
  return (
    <div className="instructions-container">
      <div className="instructions-header">
        <h2>How to Play</h2>
        <button 
          className="close-button" 
          onClick={toggleInstructions}
          aria-label="Close instructions"
        >
          ×
        </button>
      </div>
      
      <div id="instructions-content" className="instructions-content">
        <section className="instruction-section">
          <h3>Game Objective</h3>
          <p>
            The goal of the Memory Match game is to find matching pairs of cards
            by flipping them over two at a time. The player with the most pairs at the
            end of the game wins.
          </p>
        </section>
        
        <section className="instruction-section">
          <h3>How to Play</h3>
          <ol className="instruction-list">
            <li className="instruction-item">
              <div className="step-number">1</div>
              <div className="instruction-text">
                Players take turns flipping over two cards at a time.
              </div>
            </li>
            <li className="instruction-item">
              <div className="step-number">2</div>
              <div className="instruction-text">
                If the cards match, the player scores a point and gets to go again.
              </div>
            </li>
            <li className="instruction-item">
              <div className="step-number">3</div>
              <div className="instruction-text">
                If the cards don't match, they are flipped back over and it's the next player's turn.
              </div>
            </li>
            <li className="instruction-item">
              <div className="step-number">4</div>
              <div className="instruction-text">
                The game continues until all pairs have been found.
              </div>
            </li>
            <li className="instruction-item">
              <div className="step-number">5</div>
              <div className="instruction-text">
                The player with the most pairs at the end wins!
              </div>
            </li>
          </ol>
        </section>
        
        <section className="instruction-section">
          <h3>Card Types</h3>
          <div className="card-types">
            <div className="card-type">
              <div className="card-type-header">{CARD_TYPES.STANDARD}</div>
              <div className="card-type-desc">Regular cards that match with identical cards.</div>
            </div>
            <div className="card-type">
              <div className="card-type-header">{CARD_TYPES.SPECIAL}</div>
              <div className="card-type-desc">Special cards with unique abilities when matched.</div>
            </div>
            <div className="card-type">
              <div className="card-type-header">{CARD_TYPES.WILD}</div>
              <div className="card-type-desc">Can be matched with any other card.</div>
            </div>
            <div className="card-type">
              <div className="card-type-header">{CARD_TYPES.POWER}</div>
              <div className="card-type-desc">Activates powerful effects when flipped.</div>
            </div>
            <div className="card-type">
              <div className="card-type-header">{CARD_TYPES.TRAP}</div>
              <div className="card-type-desc">Causes negative effects when flipped.</div>
            </div>
          </div>
        </section>
        
        <section className="instruction-section">
          <h3>Special Card Abilities</h3>
          <ul className="instruction-list">
            <li className="instruction-item">
              <div className="step-number">✨</div>
              <div className="instruction-text">
                <strong>{SPECIAL_CARD_ABILITIES.REVEAL}</strong>: Reveals another card temporarily.
              </div>
            </li>
            <li className="instruction-item">
              <div className="step-number">✨</div>
              <div className="instruction-text">
                <strong>{SPECIAL_CARD_ABILITIES.SHUFFLE}</strong>: Shuffles the board.
              </div>
            </li>
            <li className="instruction-item">
              <div className="step-number">✨</div>
              <div className="instruction-text">
                <strong>{SPECIAL_CARD_ABILITIES.PEEK}</strong>: Allows player to peek at any card.
              </div>
            </li>
            <li className="instruction-item">
              <div className="step-number">✨</div>
              <div className="instruction-text">
                <strong>{SPECIAL_CARD_ABILITIES.MATCH_ANY}</strong>: Can be matched with any card.
              </div>
            </li>
            <li className="instruction-item">
              <div className="step-number">✨</div>
              <div className="instruction-text">
                <strong>{SPECIAL_CARD_ABILITIES.EXTRA_TURN}</strong>: Grants an extra turn.
              </div>
            </li>
          </ul>
        </section>
      </div>
      
      <button 
        className="toggle-instructions" 
        onClick={toggleInstructions}
        aria-expanded="true"
        aria-controls="instructions-content"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8"></path>
        </svg>
        Hide Instructions
      </button>
    </div>
  );
};

export default Instructions;