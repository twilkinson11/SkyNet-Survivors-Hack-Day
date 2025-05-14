import { useState, useEffect } from 'react';
import { GAME_STATES } from './useGameState';

/**
 * Custom hook to manage card flipping logic
 * @param {Object} props - Properties
 * @returns {Object} Card flipping state and functions
 */
export const useCardFlip = (props) => {
    const {
        gameState,
        updateScore,
        switchPlayer,
        recordMove,
        checkGameOver
    } = props;

    // Track currently flipped cards
    const [flippedCards, setFlippedCards] = useState([]);

    // Track if the game is currently processing a move
    const [isProcessing, setIsProcessing] = useState(false);

    // Reset flipped cards when game state changes
    useEffect(() => {
        if (gameState.status === GAME_STATES.INITIAL) {
            setFlippedCards([]);
            setIsProcessing(false);
        }
    }, [gameState.status]);

    /**
     * Handle card flip action
     * @param {Object} card - The card being flipped
     */
    const flipCard = (card) => {
        // Prevent flipping if game is not in playing state
        if (gameState.status !== GAME_STATES.PLAYING) {
            return;
        }

        // Prevent flipping if already processing a move or card is already flipped/matched
        if (
            isProcessing ||
            flippedCards.find(c => c.id === card.id) ||
            gameState.matchedPairs.includes(card.pairId)
        ) {
            return;
        }

        // Prevent flipping more than 2 cards at once
        if (flippedCards.length === 2) {
            return;
        }

        // Play flip sound
        playSound('flip');

        // Mark the card as flipped in our local state
        const updatedFlippedCards = [...flippedCards, card];
        setFlippedCards(updatedFlippedCards);

        // Record this move
        recordMove({
            player: gameState.currentPlayer,
            cardId: card.id,
            position: card.position,
            timestamp: Date.now()
        });

        // If this is the second card flipped, check for a match
        if (updatedFlippedCards.length === 2) {
            setIsProcessing(true);

            const [firstCard, secondCard] = updatedFlippedCards;

            // Wait for animation to complete before processing the result
            setTimeout(() => {
                checkForMatch(firstCard, secondCard);
            }, 1000); // Match animation time
        }
    };

    /**
     * Check if two cards match
     * @param {Object} card1 - First card
     * @param {Object} card2 - Second card
     */
    const checkForMatch = (card1, card2) => {
        const isMatch = card1.pairId === card2.pairId;

        if (isMatch) {
            handleMatch(card1.pairId);
        } else {
            handleMismatch();
        }
    };

    /**
     * Handle when two cards match
     * @param {String} pairId - ID of the matched pair
     */
    const handleMatch = (pairId) => {
        // Play match sound
        playSound('match');

        // Update the current player's score
        updateScore(1, pairId);

        // Clear flipped cards
        setFlippedCards([]);
        setIsProcessing(false);

        // Check if the game is over
        const isGameOver = checkGameOver();
        if (isGameOver) {
            // Play win sound
            playSound('win');
        }
    };

    /**
     * Handle when two cards don't match
     */
    const handleMismatch = () => {
        // Clear flipped cards
        setFlippedCards([]);
        setIsProcessing(false);

        // Switch to the other player
        switchPlayer();
    };

    /**
     * Play a sound effect
     * @param {String} soundName - Name of the sound to play
     */
    const playSound = (soundName) => {
        try {
            const sound = new Audio(`/assets/sounds/${soundName}.mp3`);
            sound.play().catch(e => console.log('Error playing sound:', e));
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    /**
     * Reset all flipped cards (used when starting a new game)
     */
    const resetFlippedCards = () => {
        setFlippedCards([]);
        setIsProcessing(false);
    };

    return {
        flippedCards,
        isProcessing,
        flipCard,
        resetFlippedCards
    };
};