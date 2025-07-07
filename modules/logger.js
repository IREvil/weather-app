import { CONFIG } from "./config.js";



export class Logger {
    constructor() {
        // Inițializează array-ul de log-uri
        // Verifică configurația
        this.logs = [];
        this.maxLogs = CONFIG.LOGGING?.MAX_LOGS || 100;
        this.levels = ['info', 'debug', 'warn', 'error'];
        this.level = CONFIG.LOGGING?.LEVEL || 'info';
    }



    debug(message, data = null) {
        // Loghează doar dacă nivelul permite
        if (this._levelAllowed('debug')) this._log('DEBUG', message, data);
    }

    info(message, data = null) {
        // Log pentru informații generale
        if (this._levelAllowed('info')) this._log('INFO', message, data);
    }

    warn(message, data = null) {
        // Log pentru warning-uri
        if (this._levelAllowed('warn')) this._log('WARN', message, data);
    }

    error(message, error = null) {
        // Log pentru erori cu stack trace
        if (this._levelAllowed('error')) this._log('ERROR', message, error?.stack || error || null);
    }

    _levelAllowed(level) {
        // Only log if the message level is >= configured level
        const configIdx = this.levels.indexOf(this.level);
        const msgIdx = this.levels.indexOf(level);
        return msgIdx >= configIdx;
    }

    // Metodă privată pentru formatarea log-urilor
    _log(level, message, data) {

        if (!CONFIG.LOGGING.ENABLED) {
            return
        }

        const levels = { debug: 0, info: 1, warn: 2, error: 3 }
        const currentLevel = levels[CONFIG.LOGGING.LEVEL]
        const messageLevel = levels[level]

        if (messageLevel < currentLevel) return;
        // Formatează: [TIMESTAMP] [LEVEL] message
        // Adaugă în array
        // Limitează numărul de log-uri
        const timestamp = new Date().toISOString();
        const entry = { timestamp, level, message, data };
        this.logs.push(entry);
        if (this.logs.length >= CONFIG.LOGGING.MAX_LOGS) {
            this.logs.shift()
        }
        switch (level) {
            case 'DEBUG': console.debug(`[${timestamp}] [${level}]`, message, data); break;
            case 'INFO': console.info(`[${timestamp}] [${level}]`, message, data); break;
            case 'WARN': console.warn(`[${timestamp}] [${level}]`, message, data); break;
            case 'ERROR': console.error(`[${timestamp}] [${level}]`, message, data); break;
        }
    }

    getLogs() {
        // Returnează toate log-urile
        return this.logs;
    }

    clearLogs() {
        // Șterge toate log-urile
        this.logs = [];
    }

    exportLogs() {
        // Returnează log-urile ca string pentru download
        return this.logs.map(log =>
            `[${log.timestamp}] [${log.level}] ${log.message}` +
            (log.data ? ` | ${JSON.stringify(log.data)}` : '')
        ).join('\n');
    }

    show() {
        alert(this.exportLogs());
    }
}

// Exportă o instanță unică (Singleton pattern)
export const logger = new Logger()

// Expune logger-ul global pentru debugging
window.logs = {
    show: () => logger.show(),
    clear: () => logger.clearLogs(),
    get: () => logger.getLogs(),
}
