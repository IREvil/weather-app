import { CONFIG } from './config.js';
import { logger } from './logger.js';

export class HistoryService {
    constructor() {
        this.storageKey = CONFIG.STORAGE_KEYS.SEARCH_HISTORY
        this.maxItems = CONFIG.MAX_HISTORY_ITEMS
    }

    addLocation(weatherData) {
        const city = weatherData?.name?.trim();
        if (!city) return;

        let history = this._loadFromStorage();

        history = history.filter(item => item.toLowerCase() !== city.toLowerCase());

        history.unshift(city);

        if (history.length > this.maxItems) {
            history = history.slice(0, this.maxItems);
        }

        this._saveToStorage(history);

        if (CONFIG.LOGGING?.ENABLED) {
            logger.info(`Added location: ${city}`);
        }
    }

    getHistory() {
        return this._loadFromStorage();
    }

    removeLocation(city) {
        if (!city) return;
        let history = this._loadFromStorage();
        history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
        this._saveToStorage(history);

        if (CONFIG.LOGGING?.ENABLED) {
            logger.info(`Removed location: ${city}`);
        }
    }

    clearHistory() {
        this._saveToStorage([]);
        if (CONFIG.LOGGING?.ENABLED) {
            logger.info(`Cleared history`);
        }
    }

    _saveToStorage(history) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(history));
        } catch (err) {
            logger.error('Failed to save to localStorage:', err.message)
        }
    }

    _loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (!data) return [];
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            logger.error('Failed to load history:', err.message);
            return [];
        }
    }
}


export const historyService = new HistoryService()
