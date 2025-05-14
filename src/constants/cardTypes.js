/**
 * Card types and related constants for the game
 */

// Main card types
export const CARD_TYPES = {
    STANDARD: 'standard',
    SPECIAL: 'special',
    WILD: 'wild',
    POWER: 'power',
    TRAP: 'trap'
  };
  
  // Card suits
  export const CARD_SUITS = {
    HEARTS: 'hearts',
    DIAMONDS: 'diamonds',
    CLUBS: 'clubs',
    SPADES: 'spades'
  };
  
  // Card values
  export const CARD_VALUES = {
    ACE: 'A',
    TWO: '2',
    THREE: '3',
    FOUR: '4',
    FIVE: '5',
    SIX: '6',
    SEVEN: '7',
    EIGHT: '8',
    NINE: '9',
    TEN: '10',
    JACK: 'J',
    QUEEN: 'Q',
    KING: 'K'
  };
  
  // Special card abilities
  export const SPECIAL_CARD_ABILITIES = {
    REVEAL: 'reveal',        // Reveals another card temporarily
    SHUFFLE: 'shuffle',      // Shuffles the board
    PEEK: 'peek',            // Allows player to peek at any card
    MATCH_ANY: 'matchAny',   // Can be matched with any card
    EXTRA_TURN: 'extraTurn', // Grants an extra turn
    FREEZE: 'freeze',        // Freezes a card in revealed state
    SWAP: 'swap'             // Swaps positions of two cards
  };
  
  // Card states
  export const CARD_STATES = {
    FACE_DOWN: 'faceDown',
    FACE_UP: 'faceUp',
    MATCHED: 'matched',
    REMOVED: 'removed',
    FROZEN: 'frozen',
    HIGHLIGHTED: 'highlighted'
  };
  
  // Card difficulty weights (for level generation)
  export const CARD_DIFFICULTY = {
    [CARD_TYPES.STANDARD]: 1,
    [CARD_TYPES.SPECIAL]: 2,
    [CARD_TYPES.WILD]: 3,
    [CARD_TYPES.POWER]: 4,
    [CARD_TYPES.TRAP]: 5
  };
  
  /**
   * Function to generate a complete deck of standard cards
   * @returns {Array} Array of card objects
   */
  export const generateStandardDeck = () => {
    const deck = [];
    
    Object.values(CARD_SUITS).forEach(suit => {
      Object.values(CARD_VALUES).forEach(value => {
        deck.push({
          id: `${value}-${suit}`,
          type: CARD_TYPES.STANDARD,
          suit,
          value,
          state: CARD_STATES.FACE_DOWN,
          matchValue: `${value}`
        });
      });
    });
    
    return deck;
  };
  
  export default {
    CARD_TYPES,
    CARD_SUITS,
    CARD_VALUES,
    SPECIAL_CARD_ABILITIES,
    CARD_STATES,
    CARD_DIFFICULTY,
    generateStandardDeck
  };