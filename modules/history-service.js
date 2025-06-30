import { CONFIG } from './config.js';

export class HistoryService {
    constructor() {
        this.storageKey = CONFIG.STORAGE_KEYS.SEARCH_HISTORY
        this.maxItems = CONFIG.MAX_HISTORY_ITEMS
    }

    addLocation(weatherData) {
        // Extrage informațiile relevante din weatherData
        // Verifică dacă locația există deja (evită duplicate)
        // Dacă există, mută-o în top
        // Dacă nu, adaugă-o la început
        // Limitează la maxItems
        // Salvează în localStorage
        // Loghează acțiunea

        // Extrage numele orașului
        const city = weatherData?.name?.trim();
        if (!city) return;

        let history = this._loadFromStorage();

        // Elimină dacă există deja (fără case sensitivity)
        history = history.filter(item => item.toLowerCase() !== city.toLowerCase());

        // Adaugă la început
        history.unshift(city);

        // Limitează la maxItems
        if (history.length > this.maxItems) {
            history = history.slice(0, this.maxItems);
        }

        this._saveToStorage(history);

        // if (CONFIG.LOGGING?.ENABLED) {
        //     console.info(`[HistoryService] Added location: ${city}`);
    }

    getHistory() {
        // Citește din localStorage
        // Returnează array-ul sau array gol dacă nu există
        return this._loadFromStorage();
    }

    removeLocation(city) {
        // Elimină o locație specifică din istoric
        // Salvează în localStorage
        if (!city) return;
        let history = this._loadFromStorage();
        history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
        this._saveToStorage(history);

        if (CONFIG.LOGGING?.ENABLED) {
            console.info(`[HistoryService] Removed location: ${city}`);
        }
    }

    clearHistory() {
        // Șterge tot istoricul
        // Salvează în localStorage
        this._saveToStorage([]);
        if (CONFIG.LOGGING?.ENABLED) {
            console.info(`[HistoryService] Cleared history`);
        }
    }

    _saveToStorage(history) {
        // Salvează array-ul în localStorage
        // Gestionează erorile (storage quota exceeded)
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(history));
        } catch (e) {
            console.error('[HistoryService] Failed to save history:', e);
        }
    }

    _loadFromStorage() {
        // Încarcă din localStorage
        // Gestionează erorile (invalid JSON, etc.)
        try {
            const data = localStorage.getItem(this.storageKey);
            if (!data) return [];
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error('[HistoryService] Failed to load history:', e);
            return [];
        }
    }
}


export const historyService = new HistoryService()
