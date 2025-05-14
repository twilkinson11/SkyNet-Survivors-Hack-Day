/**
 * localStorage utilities for the memory game
 */

const STORAGE_KEY_PREFIX = 'memory-game-';

/**
 * Save game state to localStorage
 * @param {Object} gameState - The current game state
 */
export const saveGameState = (gameState) => {
    try {
        localStorage.setItem(
            `${STORAGE_KEY_PREFIX}state`,
            JSON.stringify({
                ...gameState,
                savedAt: new Date().toISOString()
            })
        );
        return true;
    } catch (error) {
        console.error('Failed to save game state:', error);
        return false;
    }
};

/**
 * Load game state from localStorage
 * @returns {Object|null} The saved game state or null if not found
 */
export const loadGameState = () => {
    try {
        const savedState = localStorage.getItem(`${STORAGE_KEY_PREFIX}state`);
        return savedState ? JSON.parse(savedState) : null;
    } catch (error) {
        console.error('Failed to load game state:', error);
        return null;
    }
};

/**
 * Clear saved game state from localStorage
 */
export const clearGameState = () => {
    try {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}state`);
        return true;
    } catch (error) {
        console.error('Failed to clear game state:', error);
        return false;
    }
};

/**
 * Save high scores to localStorage
 * @param {Array} scores - Array of score objects { name, score, date }
 */
export const saveHighScores = (scores) => {
    try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}high-scores`, JSON.stringify(scores));
        return true;
    } catch (error) {
        console.error('Failed to save high scores:', error);
        return false;
    }
};

/**
 * Load high scores from localStorage
 * @returns {Array} Array of score objects or empty array if none found
 */
export const loadHighScores = () => {
    try {
        const scores = localStorage.getItem(`${STORAGE_KEY_PREFIX}high-scores`);
        return scores ? JSON.parse(scores) : [];
    } catch (error) {
        console.error('Failed to load high scores:', error);
        return [];
    }
};

/**
 * Add a new high score and maintain sorted order
 * @param {string} playerName - Name of the player
 * @param {number} score - The score achieved
 * @param {number} maxScores - Maximum number of scores to keep
 * @returns {boolean} Whether the score was added as a high score
 */
export const addHighScore = (playerName, score, maxScores = 10) => {
    const scores = loadHighScores();

    // Create new score entry
    const newScore = {
        name: playerName,
        score,
        date: new Date().toISOString()
    };

    // Add new score
    scores.push(newScore);

    // Sort scores (higher scores are better)
    scores.sort((a, b) => b.score - a.score);

    // Keep only top scores
    const topScores = scores.slice(0, maxScores);

    // Save back to storage
    saveHighScores(topScores);

    // Return whether this score made it to the high score list
    return topScores.some(entry => entry === newScore);
};

/**
 * Save game settings to localStorage
 * @param {Object} settings - Game settings object
 */
export const saveGameSettings = (settings) => {
    try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}settings`, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error('Failed to save game settings:', error);
        return false;
    }
};

/**
 * Load game settings from localStorage
 * @param {Object} defaultSettings - Default settings to use if none found
 * @returns {Object} The saved settings or default settings
 */
export const loadGameSettings = (defaultSettings) => {
    try {
        const settings = localStorage.getItem(`${STORAGE_KEY_PREFIX}settings`);
        return settings ? { ...defaultSettings, ...JSON.parse(settings) } : defaultSettings;
    } catch (error) {
        console.error('Failed to load game settings:', error);
        return defaultSettings;
    }
};

/**
 * Check if localStorage is available
 * @returns {boolean} Whether localStorage is supported and available
 */
export const isLocalStorageAvailable = () => {
    try {
        const testKey = `${STORAGE_KEY_PREFIX}test`;
        localStorage.setItem(testKey, 'test');
        const result = localStorage.getItem(testKey) === 'test';
        localStorage.removeItem(testKey);
        return result;
    } catch (e) {
        return false;
    }
};