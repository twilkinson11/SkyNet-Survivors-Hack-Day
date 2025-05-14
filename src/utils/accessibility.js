/**
 * Accessibility utilities for the memory game
 */

/**
 * Announces game events for screen readers
 * @param {string} message - The message to announce
 */
export const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove the element after it's been announced
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
};

/**
 * Makes a card element fully accessible
 * @param {HTMLElement} cardElement - The card DOM element
 * @param {Object} cardData - Data associated with the card
 * @param {Function} onSelect - Callback when card is selected
 */
export const makeCardAccessible = (cardElement, cardData, onSelect) => {
    // Set appropriate ARIA attributes
    cardElement.setAttribute('role', 'button');
    cardElement.setAttribute('aria-label', cardData.flipped
        ? `Card ${cardData.value}, flipped`
        : `Card ${cardData.id}, face down`);
    cardElement.setAttribute('aria-pressed', cardData.flipped ? 'true' : 'false');
    cardElement.setAttribute('tabindex', '0');

    // Add keyboard support
    cardElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(cardData.id);
        }
    });
};

/**
 * Adds keyboard navigation for the game board
 * @param {Array} cardElements - Array of card DOM elements
 */
export const setupKeyboardNavigation = (cardElements) => {
    cardElements.forEach((card, index) => {
        card.addEventListener('keydown', (e) => {
            let nextIndex;

            // Grid navigation (assuming a square grid)
            const gridSize = Math.sqrt(cardElements.length);
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;

            switch (e.key) {
                case 'ArrowRight':
                    nextIndex = row * gridSize + ((col + 1) % gridSize);
                    break;
                case 'ArrowLeft':
                    nextIndex = row * gridSize + ((col - 1 + gridSize) % gridSize);
                    break;
                case 'ArrowDown':
                    nextIndex = ((row + 1) % gridSize) * gridSize + col;
                    break;
                case 'ArrowUp':
                    nextIndex = ((row - 1 + gridSize) % gridSize) * gridSize + col;
                    break;
                default:
                    return;
            }

            e.preventDefault();
            cardElements[nextIndex].focus();
        });
    });
};

/**
 * Create a skip to game content link for keyboard users
 * @returns {HTMLElement} The skip link element
 */
export const createSkipToGameLink = () => {
    const skipLink = document.createElement('a');
    skipLink.setAttribute('class', 'skip-link');
    skipLink.setAttribute('href', '#game-board');
    skipLink.textContent = 'Skip to game';

    // Style the skip link - visible only on focus
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '100';
    skipLink.style.transition = 'top 0.3s';

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    return skipLink;
};