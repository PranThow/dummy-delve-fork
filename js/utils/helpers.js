// Utility functions for common operations

export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function log(message, category = "LOG") {
    console.log(`[${category}] ${message}`);
}
