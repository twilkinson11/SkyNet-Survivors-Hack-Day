/**
 * Game settings and configuration constants
 */

// Difficulty levels
export const DIFFICULTY_LEVELS = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    EXPERT: 'expert'
  };
  
  // Game modes
  export const GAME_MODES = {
    CLASSIC: 'classic',       // Standard memory matching
    TIMED: 'timed',           // Race against the clock
    CHALLENGE: 'challenge',   // Preset challenges with goals
    ENDLESS: 'endless',       // Keep playing with increasing difficulty
    MULTIPLAYER: 'multiplayer' // Competition with other players
  };
  
  // Board sizes by difficulty
  export const BOARD_SIZES = {
    [DIFFICULTY_LEVELS.EASY]: {
      rows: 4,
      cols: 4,
      cardCount: 16
    },
    [DIFFICULTY_LEVELS.MEDIUM]: {
      rows: 6,
      cols: 6,
      cardCount: 36
    },
    [DIFFICULTY_LEVELS.HARD]: {
      rows: 8,
      cols: 6,
      cardCount: 48
    },
    [DIFFICULTY_LEVELS.EXPERT]: {
      rows: 8,
      cols: 8,
      cardCount: 64
    }
  };
  
  // Time limits for timed mode (in seconds)
  export const TIME_LIMITS = {
    [DIFFICULTY_LEVELS.EASY]: 120,
    [DIFFICULTY_LEVELS.MEDIUM]: 180,
    [DIFFICULTY_LEVELS.HARD]: 240,
    [DIFFICULTY_LEVELS.EXPERT]: 300
  };
  
  // Scoring configuration
  export const SCORING = {
    MATCH_POINTS: 10,           // Points for matching a pair of standard cards
    SPECIAL_MATCH_POINTS: 15,   // Points for matching special cards
    COMBO_MULTIPLIER: 1.5,      // Multiplier for consecutive matches
    MAX_COMBO: 5,               // Maximum combo multiplier
    TIME_BONUS_FACTOR: 0.1,     // Points per second left (timed mode)
    WRONG_MATCH_PENALTY: -2     // Points deducted for incorrect match attempt
  };
  
  // Level progression
  export const LEVEL_PROGRESSION = {
    MATCHES_TO_ADVANCE: {
      [DIFFICULTY_LEVELS.EASY]: 8,
      [DIFFICULTY_LEVELS.MEDIUM]: 18,
      [DIFFICULTY_LEVELS.HARD]: 24,
      [DIFFICULTY_LEVELS.EXPERT]: 32
    },
    DIFFICULTY_SCALING: 1.2,     // How much harder each level gets
    SPECIAL_CARD_FREQUENCY: {    // How often special cards appear (as percentage of deck)
      [DIFFICULTY_LEVELS.EASY]: 0.05,
      [DIFFICULTY_LEVELS.MEDIUM]: 0.1,
      [DIFFICULTY_LEVELS.HARD]: 0.15,
      [DIFFICULTY_LEVELS.EXPERT]: 0.2
    }
  };
  
  // Power-up settings
  export const POWER_UPS = {
    REVEAL_ALL: {
      duration: 2,              // Duration in seconds
      cooldown: 30              // Cooldown in seconds
    },
    EXTRA_TIME: {
      amount: 15,               // Additional seconds
      cooldown: 45
    },
    HINT: {
      cooldown: 20
    },
    SHUFFLE: {
      cooldown: 25
    }
  };
  
  // Default game settings
  export const DEFAULT_SETTINGS = {
    difficulty: DIFFICULTY_LEVELS.MEDIUM,
    gameMode: GAME_MODES.CLASSIC,
    soundEnabled: true,
    musicEnabled: true,
    animationsEnabled: true,
    darkMode: false,
    showTimer: true,
    allowPowerUps: true,
    enableTutorial: true
  };
  
  // Storage keys
  export const STORAGE_KEYS = {
    SETTINGS: 'cardgame_settings',
    HIGH_SCORES: 'cardgame_highscores',
    PROGRESS: 'cardgame_progress',
    UNLOCKED_THEMES: 'cardgame_themes'
  };
  
  export default {
    DIFFICULTY_LEVELS,
    GAME_MODES,
    BOARD_SIZES,
    TIME_LIMITS,
    SCORING,
    LEVEL_PROGRESSION,
    POWER_UPS,
    DEFAULT_SETTINGS,
    STORAGE_KEYS
  };