// src/context/GameContext.jsx
import React, { createContext, useReducer, useEffect } from 'react';
import { generateCardPairs } from '../utils/generateCardPairs';

// Create context
export const GameContext = createContext();

// Initial state
const initialState = {
  cards: [],
  currentPlayer: 1,
  player1Score: 0,
  player2Score: 0,
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  flippedCards: [],
  matchedPairs: [],
  isChecking: false,
  gameOver: false,
  winner: null,
  gameHistory: [],
};

// Reducer function
function gameReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...initialState,
        cards: action.payload.cards,
        player1Name: action.payload.player1Name,
        player2Name: action.payload.player2Name,
        gameHistory: state.gameHistory,
      };

    case 'FLIP_CARD':
      // Prevent flipping if already checking a pair or card is already flipped/matched
      if (
        state.isChecking || 
        state.flippedCards.includes(action.payload) || 
        state.matchedPairs.includes(state.cards.find(card => card.id === action.payload).pairId)
      ) {
        return state;
      }

      // If 2 cards are already flipped, don't allow flipping more
      if (state.flippedCards.length === 2) {
        return state;
      }

      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload],
      };

    case 'START_CHECK':
      return {
        ...state,
        isChecking: true,
      };

    case 'CHECK_MATCH':
      // Get the two flipped cards
      const [firstCardId, secondCardId] = state.flippedCards;
      const firstCard = state.cards.find(card => card.id === firstCardId);
      const secondCard = state.cards.find(card => card.id === secondCardId);
      
      // Check if cards match
      const isMatch = firstCard.pairId === secondCard.pairId;
      
      // If match, update matched pairs and current player's score
      if (isMatch) {
        const newMatchedPairs = [...state.matchedPairs, firstCard.pairId];
        const allPairsMatched = newMatchedPairs.length === 4; // 4 pairs in a 3x3 grid
        
        // Determine winner if game is over
        let winner = null;
        if (allPairsMatched) {
          const player1Final = state.currentPlayer === 1 ? 
            state.player1Score + 1 : state.player1Score;
          const player2Final = state.currentPlayer === 2 ? 
            state.player2Score + 1 : state.player2Score;
            
          if (player1Final > player2Final) winner = 1;
          else if (player2Final > player1Final) winner = 2;
          else winner = 0; // Draw
        }
        
        // Update game history if game is over
        const newGameHistory = allPairsMatched ? 
          [...state.gameHistory, {
            date: new Date().toISOString(),
            player1: state.player1Name,
            player2: state.player2Name,
            player1Score: state.currentPlayer === 1 ? state.player1Score + 1 : state.player1Score,
            player2Score: state.currentPlayer === 2 ? state.player2Score + 1 : state.player2Score,
            winner
          }] : state.gameHistory;
        
        return {
          ...state,
          flippedCards: [],
          matchedPairs: newMatchedPairs,
          [`player${state.currentPlayer}Score`]: state[`player${state.currentPlayer}Score`] + 1,
          isChecking: false,
          gameOver: allPairsMatched,
          winner,
          gameHistory: newGameHistory
        };
      } 
      
      // If no match, clear flipped cards and switch player
      return {
        ...state,
        flippedCards: [],
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        isChecking: false,
      };
      
    case 'RESET_GAME':
      return {
        ...initialState,
        cards: generateCardPairs(),
        player1Name: state.player1Name,
        player2Name: state.player2Name,
        gameHistory: state.gameHistory
      };
      
    default:
      return state;
  }
}

// Provider component
export const GameProvider = ({ children, player1Name, player2Name }) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    ...initialState,
    player1Name,
    player2Name
  });

  // Initialize game on first render
  useEffect(() => {
    // Load saved game from localStorage if exists
    const savedGame = localStorage.getItem('memoryGameState');
    
    if (savedGame) {
      try {
        const parsedState = JSON.parse(savedGame);
        // Update with current player names
        parsedState.player1Name = player1Name;
        parsedState.player2Name = player2Name;
        
        // If game was not over, use saved state
        if (!parsedState.gameOver) {
          dispatch({ type: 'INITIALIZE_GAME', payload: parsedState });
          return;
        }
      } catch (error) {
        console.error('Error parsing saved game state:', error);
      }
    }
    
    // Start a new game if no saved game or saved game was over
    dispatch({ 
      type: 'INITIALIZE_GAME', 
      payload: {
        cards: generateCardPairs(),
        player1Name,
        player2Name
      }
    });
  }, [player1Name, player2Name]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('memoryGameState', JSON.stringify(gameState));
  }, [gameState]);

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      // Wait a moment before checking to allow user to see the second card
      dispatch({ type: 'START_CHECK' });
      
      const timer = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.flippedCards]);

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};