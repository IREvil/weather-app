import { CONFIG } from "./config.js";



export class Logger {
    constructor() {
        this.logs = [];
        this.maxLogs = CONFIG.LOGGING?.MAX_LOGS || 100;
        this.levels = ['info', 'debug', 'warn', 'error'];
        this.level = CONFIG.LOGGING?.LEVEL || 'info';
    }



    debug(message, data = null) {
        if (this._levelAllowed('debug')) this._log('DEBUG', message, data);
    }

    info(message, data = null) {
        if (this._levelAllowed('info')) this._log('INFO', message, data);
    }

    warn(message, data = null) {
        if (this._levelAllowed('warn')) this._log('WARN', message, data);
    }

    error(message, error = null) {
        if (this._levelAllowed('error')) this._log('ERROR', message, error?.stack || error || null);
    }

    _levelAllowed(level) {
        const configIdx = this.levels.indexOf(this.level);
        const msgIdx = this.levels.indexOf(level);
        return msgIdx >= configIdx;
    }

    _log(level, message, data) {

        if (!CONFIG.LOGGING.ENABLED) {
            return
        }

        const levels = { debug: 0, info: 1, warn: 2, error: 3 }
        const currentLevel = levels[CONFIG.LOGGING.LEVEL]
        const messageLevel = levels[level]

        if (messageLevel < currentLevel) return;
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
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }

    exportLogs() {
        return this.logs.map(log =>
            `[${log.timestamp}] [${log.level}] ${log.message}` +
            (log.data ? ` | ${JSON.stringify(log.data)}` : '')
        ).join('\n');
    }

    show() {
        alert(this.exportLogs());
    }
}

export const logger = new Logger()

window.logs = {
    show: () => logger.show(),
    clear: () => logger.clearLogs(),
    get: () => logger.getLogs(),
}
