import { useState, useEffect, useReducer } from 'react';
import { generateCardPairs } from '../utils/generateCardPairs';

// Constants
const GAME_STATES = {
    INITIAL: 'INITIAL',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER'
};

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
    turns: 0,
    status: GAME_STATES.INITIAL
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
                status: GAME_STATES.PLAYING
            };

        case 'UPDATE_SCORE':
            return {
                ...state,
                [`player${state.currentPlayer}Score`]: state[`player${state.currentPlayer}Score`] + action.payload,
                matchedPairs: [...state.matchedPairs, action.payload.pairId]
            };

        case 'SWITCH_PLAYER':
            return {
                ...state,
                currentPlayer: state.currentPlayer === 1 ? 2 : 1,
                turns: state.turns + 1
            };

        case 'RECORD_MOVE':
            return {
                ...state,
                lastMove: action.payload
            };

        case 'SET_GAME_OVER':
            const player1Final = state.player1Score;
            const player2Final = state.player2Score;
            let winner = null;

            if (player1Final > player2Final) winner = 1;
            else if (player2Final > player1Final) winner = 2;
            else winner = 0; // Draw

            return {
                ...state,
                gameOver: true,
                status: GAME_STATES.GAME_OVER,
                winner,
                gameHistory: [
                    ...state.gameHistory,
                    {
                        date: new Date().toISOString(),
                        player1: state.player1Name,
                        player2: state.player2Name,
                        player1Score: player1Final,
                        player2Score: player2Final,
                        winner
                    }
                ]
            };

        case 'RESET_GAME':
            return {
                ...initialState,
                player1Name: state.player1Name,
                player2Name: state.player2Name,
                gameHistory: state.gameHistory
            };

        default:
            return state;
    }
}

/**
 * Custom hook to manage the game state
 * @param {Object} initialProps - Initial properties
 * @returns {Object} Game state and functions to manipulate it
 */
export const useGameState = (initialProps = {}) => {
    const { player1Name = 'Player 1', player2Name = 'Player 2' } = initialProps;

    const [gameState, dispatch] = useReducer(gameReducer, {
        ...initialState,
        player1Name,
        player2Name
    });

    const [savedGame, setSavedGame] = useState(null);

    // Load saved game on first render
    useEffect(() => {
        const loadSavedGame = () => {
            const savedData = localStorage.getItem('memoryGameState');
            if (savedData) {
                try {
                    const parsedState = JSON.parse(savedData);
                    // Update with current player names
                    parsedState.player1Name = player1Name;
                    parsedState.player2Name = player2Name;

                    // If game was not over, use saved state
                    if (!parsedState.gameOver) {
                        setSavedGame(parsedState);
                        return true;
                    }
                } catch (error) {
                    console.error('Error parsing saved game state:', error);
                }
            }
            return false;
        };

        const hasSavedGame = loadSavedGame();

        if (!hasSavedGame) {
            // Start new game if no saved game exists
            startGame();
        }
    }, [player1Name, player2Name]);

    // Save game state to localStorage whenever it changes
    useEffect(() => {
        if (gameState.status !== GAME_STATES.INITIAL) {
            localStorage.setItem('memoryGameState', JSON.stringify(gameState));
        }
    }, [gameState]);

    /**
     * Start a new game
     */
    const startGame = () => {
        const cards = generateCardPairs();

        dispatch({
            type: 'INITIALIZE_GAME',
            payload: {
                cards,
                player1Name,
                player2Name
            }
        });
    };

    /**
     * Update the score for the current player
     * @param {Number} points - Points to add
     * @param {String} pairId - ID of the matched pair
     */
    const updateScore = (points, pairId) => {
        dispatch({
            type: 'UPDATE_SCORE',
            payload: { points, pairId }
        });
    };

    /**
     * Switch to the next player
     */
    const switchPlayer = () => {
        dispatch({ type: 'SWITCH_PLAYER' });
    };

    /**
     * Record a move in the game history
     * @param {Object} move - Details of the move
     */
    const recordMove = (move) => {
        dispatch({
            type: 'RECORD_MOVE',
            payload: move
        });
    };

    /**
     * Check if the game is over
     * @returns {Boolean} True if game is over
     */
    const checkGameOver = () => {
        // Game is over when all pairs are matched (4 pairs in a 3x3 grid)
        if (gameState.matchedPairs.length === 4) {
            dispatch({ type: 'SET_GAME_OVER' });
            return true;
        }
        return false;
    };

    /**
     * Reset the game
     */
    const resetGame = () => {
        dispatch({ type: 'RESET_GAME' });
        localStorage.removeItem('memoryGameState');
        startGame();
    };

    return {
        gameState,
        startGame,
        updateScore,
        switchPlayer,
        recordMove,
        checkGameOver,
        resetGame,
        dispatch
    };
};

// Export constants for use elsewhere
export { GAME_STATES };