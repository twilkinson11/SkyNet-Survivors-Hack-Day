/**
 * Card shuffling utilities for the memory game
 */

/**
 * Fisher-Yates shuffle algorithm to randomize card positions
 * @param {Array} array - Array of cards to shuffle
 * @returns {Array} Shuffled array of cards
 */
export const shuffleCards = (array) => {
    // Create a copy of the array to avoid mutating the original
    const shuffled = [...array];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at i and j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

/**
 * Creates a complete set of paired cards for the memory game
 * @param {Array} cardValues - Array of unique values/identifiers for each card pair
 * @returns {Array} Array of card objects with unique IDs but paired values
 */
export const createCardDeck = (cardValues) => {
    // For each value, create two cards with the same matching value but unique IDs
    const cards = cardValues.flatMap((value, index) => [
        { id: `card-${index}-a`, value, flipped: false, matched: false },
        { id: `card-${index}-b`, value, flipped: false, matched: false }
    ]);

    // Return shuffled deck
    return shuffleCards(cards);
};

/**
 * Creates cards with different difficulty levels
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Array} Shuffled array of card objects
 */
export const createCardsByDifficulty = (difficulty) => {
    let cardValues = [];

    // Define number of pairs based on difficulty
    let pairCount;
    switch (difficulty) {
        case 'easy':
            pairCount = 6; // 12 cards total
            break;
        case 'medium':
            pairCount = 10; // 20 cards total
            break;
        case 'hard':
            pairCount = 15; // 30 cards total
            break;
        default:
            pairCount = 8; // Default
    }

    // Create unique values for the pairs
    for (let i = 1; i <= pairCount; i++) {
        cardValues.push(i);
    }

    return createCardDeck(cardValues);
};

/**
 * Validates if a card deck is properly shuffled with all pairs present
 * @param {Array} deck - Array of card objects
 * @returns {boolean} True if deck is valid, false otherwise
 */
export const validateCardDeck = (deck) => {
    // Track count of each card value
    const valueCounts = {};

    // Count occurrences of each card value
    deck.forEach(card => {
        valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
    });

    // Check if all values appear exactly twice (as pairs)
    return Object.values(valueCounts).every(count => count === 2);
};

/**
 * Ensures cards are not too predictably arranged
 * (prevents pairs from being adjacent too often)
 * @param {Array} deck - Array of card objects
 * @returns {Array} Re-shuffled deck if needed
 */
export const ensureQualityShuffle = (deck) => {
    // Count how many pairs are adjacent
    let adjacentPairs = 0;

    // Group cards by their value
    const cardsByValue = {};
    deck.forEach(card => {
        if (!cardsByValue[card.value]) {
            cardsByValue[card.value] = [];
        }
        cardsByValue[card.value].push(card.id);
    });

    // Check for adjacent pairs
    for (let i = 0; i < deck.length - 1; i++) {
        if (deck[i].value === deck[i + 1].value) {
            adjacentPairs++;
        }
    }

    // If more than 25% of pairs are adjacent, re-shuffle
    if (adjacentPairs > deck.length / 8) {
        return shuffleCards(deck);
    }

    return deck;
};

/**
 * Default export combining the main functionality
 * @param {Array|string} cardsOrDifficulty - Array of card values or difficulty string
 * @returns {Array} Shuffled and validated card deck
 */
export default function(cardsOrDifficulty) {
    // Handle based on input type
    let deck;

    if (typeof cardsOrDifficulty === 'string') {
        // Create cards by difficulty level
        deck = createCardsByDifficulty(cardsOrDifficulty);
    } else if (Array.isArray(cardsOrDifficulty)) {
        // Create cards from provided values
        deck = createCardDeck(cardsOrDifficulty);
    } else {
        // Default to medium difficulty
        deck = createCardsByDifficulty('medium');
    }

    // Ensure quality shuffle and return
    return ensureQualityShuffle(deck);
}