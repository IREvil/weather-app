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
    }

    getHistory() {
        // Citește din localStorage
        // Returnează array-ul sau array gol dacă nu există
    }

    removeLocation(city) {
        // Elimină o locație specifică din istoric
        // Salvează în localStorage
    }

    clearHistory() {
        // Șterge tot istoricul
        // Salvează în localStorage
    }

    _saveToStorage(history) {
        // Salvează array-ul în localStorage
        // Gestionează erorile (storage quota exceeded)
    }

    _loadFromStorage() {
        // Încarcă din localStorage
        // Gestionează erorile (invalid JSON, etc.)
    }
}

export const historyService = new HistoryService()
