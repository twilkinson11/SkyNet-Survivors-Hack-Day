// src/utils/generateCardPairs.js
/**
 * Generates card pairs for the memory game
 * For a 3x3 grid, we need 4 pairs and 1 odd card
 * @returns {Array} Array of card objects
 */
export const generateCardPairs = () => {
    // Card types - we need 4 pairs plus 1 odd card
    const cardTypes = ['A', 'B', 'C', 'D', 'E'];
    
    // Create card objects
    const cards = [];
    cardTypes.forEach((type, index) => {
      // For each type except the last one (which is the odd card),
      // create a pair with the same pairId
      if (index < 4) {
        // First card of the pair
        cards.push({
          id: `${type}-1`,
          type,
          pairId: type,
        });
        
        // Second card of the pair
        cards.push({
          id: `${type}-2`,
          type,
          pairId: type,
        });
      } else {
        // The odd card
        cards.push({
          id: `${type}-1`,
          type,
          pairId: type,
        });
      }
    });
    
    // Shuffle the cards using Fisher-Yates algorithm
    return shuffleCards(cards);
  };
  
  /**
   * Shuffles an array using the Fisher-Yates algorithm
   * @param {Array} array Array to shuffle
   * @returns {Array} Shuffled array
   */
  const shuffleCards = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };