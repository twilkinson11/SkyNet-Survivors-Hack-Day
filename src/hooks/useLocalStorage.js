/**
 * Custom hook for persistent storage using localStorage
 * @param {string} key - Storage key
 * @param {*} initialValue - Default value if no stored value exists
 * @returns {Array} [storedValue, setValue] - Similar to useState
 */
export const useLocalStorage = (key, initialValue) => {
    // Get from localStorage then parse stored json or return initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage
    const setValue = value => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            // Save to state
            setStoredValue(valueToStore);

            // Save to localStorage
            if (valueToStore === null) {
                window.localStorage.removeItem(key);
            } else {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    // Update stored value if localStorage changes in another tab/window
    useEffect(() => {
        const handleStorageChange = event => {
            if (event.key === key) {
                try {
                    const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
                    setStoredValue(newValue);
                } catch (error) {
                    console.error(`Error parsing localStorage value for key "${key}":`, error);
                }
            }
        };

        // Listen for storage events
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [storedValue, setValue];
};

import { useState, useEffect } from 'react';

/**
 * Helper function to save data to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export const saveToLocalStorage = (key, value) => {
    try {
        if (value === null || value === undefined) {
            window.localStorage.removeItem(key);
        } else {
            const serializedValue = JSON.stringify(value);
            window.localStorage.setItem(key, serializedValue);
        }
    } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
    }
};

/**
 * Helper function to retrieve data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The stored value or defaultValue
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
    try {
        const serializedValue = window.localStorage.getItem(key);
        if (serializedValue === null) {
            return defaultValue;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error(`Error getting from localStorage key "${key}":`, error);
        return defaultValue;
    }
};