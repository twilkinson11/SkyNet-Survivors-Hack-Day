/**
 * Animation utilities for the memory game
 */

/**
 * Creates a flip animation for a card
 * @param {HTMLElement} element - The card element to animate
 * @param {boolean} toFront - Whether to flip to front (true) or back (false)
 * @returns {Promise} A promise that resolves when the animation completes
 */
export const flipCard = (element, toFront) => {
    return new Promise((resolve) => {
        // Add flip class to start animation
        element.classList.add('flipping');

        // At halfway point of animation, change the visible face
        setTimeout(() => {
            if (toFront) {
                element.classList.add('flipped');
            } else {
                element.classList.remove('flipped');
            }
        }, 150); // Half of the transition time

        // Remove the flipping class when done
        setTimeout(() => {
            element.classList.remove('flipping');
            resolve();
        }, 300); // Full transition time
    });
};

/**
 * Creates a match success animation
 * @param {Array} elements - The matched card elements
 * @returns {Promise} A promise that resolves when the animation completes
 */
export const animateMatch = (elements) => {
    return new Promise((resolve) => {
        elements.forEach(element => {
            element.classList.add('matched');

            // Add a small bounce animation
            element.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'ease-in-out'
            });
        });

        setTimeout(resolve, 350);
    });
};

/**
 * Creates a mismatch animation
 * @param {Array} elements - The mismatched card elements
 * @returns {Promise} A promise that resolves when the animation completes
 */
export const animateMismatch = (elements) => {
    return new Promise((resolve) => {
        elements.forEach(element => {
            element.classList.add('mismatched');

            // Add a small shake animation
            element.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 400,
                easing: 'ease-in-out'
            });
        });

        // Reset after animation
        setTimeout(() => {
            elements.forEach(element => {
                element.classList.remove('mismatched');
            });
            resolve();
        }, 450);
    });
};

/**
 * Animates the game over celebration
 * @param {boolean} victory - Whether the player won
 * @returns {Promise} A promise that resolves when the animation completes
 */
export const animateGameOver = (victory) => {
    return new Promise((resolve) => {
        if (victory) {
            // Create confetti effect for victory
            const confettiCount = 100;
            const container = document.createElement('div');
            container.className = 'confetti-container';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '1000';
            document.body.appendChild(container);

            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.position = 'absolute';
                confetti.style.width = `${Math.random() * 10 + 5}px`;
                confetti.style.height = `${Math.random() * 10 + 5}px`;
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = '-20px';

                container.appendChild(confetti);

                const duration = Math.random() * 3000 + 2000;
                confetti.animate([
                    { transform: 'translateY(0) rotate(0)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration,
                    easing: 'ease-in',
                    fill: 'forwards'
                });
            }

            setTimeout(() => {
                document.body.removeChild(container);
                resolve();
            }, 5000);
        } else {
            // Simple fade effect for loss
            const overlay = document.createElement('div');
            overlay.className = 'game-over-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            overlay.style.opacity = '0';
            overlay.style.zIndex = '999';
            overlay.style.pointerEvents = 'none';
            document.body.appendChild(overlay);

            overlay.animate([
                { opacity: 0 },
                { opacity: 1 },
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-in-out',
                fill: 'forwards'
            });

            setTimeout(() => {
                document.body.removeChild(overlay);
                resolve();
            }, 2100);
        }
    });
};

/**
 * Creates a pulse animation for elements
 * @param {HTMLElement} element - The element to animate
 * @param {number} duration - Duration in ms
 * @returns {Animation} The created animation
 */
export const createPulseAnimation = (element, duration = 1000) => {
    return element.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.05)', opacity: 0.8 },
        { transform: 'scale(1)', opacity: 1 }
    ], {
        duration,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
};