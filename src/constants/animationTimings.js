/**
 * Animation timing constants used throughout the game
 * All values are in milliseconds
 */

export const ANIMATION_TIMINGS = {
    // Card animations
    CARD_FLIP: 300,
    CARD_DEAL: 200,
    CARD_MOVE: 250,
    CARD_REMOVE: 400,
    CARD_HOVER: 150,
    
    // UI animations
    MODAL_APPEAR: 250,
    MODAL_DISAPPEAR: 200,
    BUTTON_PRESS: 100,
    NOTIFICATION_FADE: 400,
    SCORE_INCREMENT: 800,
    
    // Game state transitions
    LEVEL_TRANSITION: 500,
    GAME_START: 600,
    GAME_END: 1000,
    
    // Effects
    MATCH_HIGHLIGHT: 600,
    ERROR_SHAKE: 300,
    SUCCESS_PULSE: 400,
    POWER_UP_ACTIVATION: 850,
    
    // Delays
    MATCH_DELAY: 350,
    MISMATCH_DELAY: 1000,
    GAME_OVER_DELAY: 1500,
    LEVEL_COMPLETE_DELAY: 1200
  };
  
  /**
   * Helper function to get timing with a delay multiplier
   * @param {string} timingKey - Key from ANIMATION_TIMINGS
   * @param {number} multiplier - Multiplier for the timing (default: 1)
   * @returns {number} - Calculated timing value
   */
  export const getTiming = (timingKey, multiplier = 1) => {
    if (!ANIMATION_TIMINGS[timingKey]) {
      console.warn(`Animation timing key '${timingKey}' not found`);
      return 0;
    }
    return ANIMATION_TIMINGS[timingKey] * multiplier;
  };
  
  export default ANIMATION_TIMINGS;