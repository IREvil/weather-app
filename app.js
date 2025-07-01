// import { elements, displayWeather, showLoading, hideLoading } from './modules/ui-controller.js';
// import { getCurrentWeather } from './modules/weather-service.js';
// if (!localStorage.getItem('unit')) localStorage.setItem('unit', 'metric');
// if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'ro');



import * as service from './modules/weather-service.js';
import { CONFIG, TRANSLATIONS, MOCK_DATA, API_ENDPOINTS, ERROR_MESSAGES } from './modules/config.js';
import * as ui from './modules/ui-controller.js';
import * as location from './modules/location-service.js'
import { map, loadMapDef, onMapClick, darkLayer, setTheme, satelliteEnabled, currentLayer, currentTheme } from './modules/map-service.js';
import { historyService } from './modules/history-service.js';
import { logger } from './modules/logger.js';

logger.info('Logger test started')
logger.debug('Debug message', { test: true })
logger.warn('Warning message')
logger.error('Error message', new Error('Test error'))

console.log('All logs:', logger.getLogs())

const setupEventListeners = () => {
    // Submit în form (enter din search field sau click pe buton)
    ui.elements.searchButton.addEventListener('click', handleSearch);
    document.querySelector('#city-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    ui.elements.unitSelect.addEventListener('change', function () {
        const unit = this.checked ? "imperial" : "metric";
        CONFIG.DEFAULT_UNITS = unit;
        localStorage.setItem('unit', unit);
        const currentTemp = ui.elements.temperatureInfo.textContent;
        let convertedTemp
        if (unit === "imperial") {
            convertedTemp = (currentTemp * 9 / 5 + 32).toFixed(1)
            ui.elements.tempUnit.textContent = "°F";
            ui.elements.windUnit.textContent = "mph"
            service.getCurrentWeather(ui.elements.locationInfo.textContent).then((data) => {
                ui.displayWeather(data)
            })
        } else {
            ui.elements.tempUnit.textContent = "°C"
            ui.elements.windUnit.textContent = "m/s"
            service.getCurrentWeather(ui.elements.locationInfo.textContent).then((data) => {
                ui.displayWeather(data)
            })
        }
    })

    ui.elements.themeSelect.addEventListener('change', function () {
        const theme = this.checked ? "dark" : "light";
        CONFIG.DEFAULT_THEME = theme;
        localStorage.setItem('theme', theme);
        setTheme(theme)
        document.body.classList.toggle('dark');
        ui.themes.main.classList.toggle('dark');
        ui.themes.recents.classList.toggle('dark');
        ui.themes.forecast.classList.toggle('dark');
        ui.themes.map.classList.toggle('dark');
    })

    // document.querySelector("#lang-select") 
    ui.elements.langSelect.addEventListener('change', (e) => {
        localStorage.setItem('lang', e.target.value);
        const lang = e.target.value;
        document.documentElement.lang = lang;

        document.querySelectorAll('.data-label').forEach(label => {
            const key = label.dataset.key;
            if (TRANSLATIONS[lang][key]) {
                label.textContent = TRANSLATIONS[lang][key];
            }
        });

        service.getCurrentWeather(ui.elements.locationInfo.textContent).then((data) => {
            ui.displayWeather(data)
        })
    })

    ui.elements.historyBlock.addEventListener('click', function (e) {
        // Remove city
        if (e.target.classList.contains('clear-btn')) {
            const city = e.target.getAttribute('data-city');
            historyService.removeLocation(city);
            ui.renderHistory();
            return;
        }
        // Reuse city for search
        if (e.target.classList.contains('history-city')) {
            const city = e.target.getAttribute('data-city');
            ui.elements.cityInput.value = city;
            handleSearch();
            return;
        }
        // Clear all history
        if (e.target.id === 'clear-history-all') {
            historyService.clearHistory();
            ui.renderHistory();
            return;
        }
    });

    map.on('click', function (e) {
        onMapClick(e);
        mapWeather(e.latlng);
        ui.showMessage('Map pin')
    })
}

const handleSearch = async () => {
    const city = document.querySelector('#city-input').value.trim();

    // Validează input
    if (!isValidCity(city)) {
        logger.error('Nume invalid')
        return;
    }
    // Arată loading
    ui.showLoading();
    // Apelează weather service
    try {
        const weatherData = await service.getCurrentWeatherWithFallback(city).then((data) => {
            return (data)
        })
        // Ascunde loading, arată rezultat
        ui.hideLoading();
        ui.clearMessage()
        ui.displayWeather(weatherData);
        historyService.addLocation(weatherData);
        ui.renderHistory();
    }
    // Gestionează erorile
    catch (error) {
        console.error(error);
        ui.showError('Nu s-au gasit date pentru acest oras');
    }
}

const handleLocationSearch = async () => {
    try {
        // Cum folosești noul location service?
        ui.showLoading('Detectez locația...')

        const coords = await location.getCoords()

        // Cum afișezi diferit pentru GPS vs IP location?
        if (coords.source === 'ip') {
            ui.showMessage('*Locație aproximativă bazată pe IP', 'warning')
        }

        ui.showLoading('Încarc vremea...')
        const weather = await service.getWeatherByCoords(coords.latitude, coords.longitude)
        // console.log(weather)
        ui.hideLoading();
        ui.displayWeather(weather)

        map.panTo([coords.latitude, coords.longitude], 13);
        // console.log(coords.latitude, coords.longitude)

        historyService.addLocation(weather);

        // Update history UI
        ui.renderHistory();
    } catch (error) {
        ui.showError(`Locația nu a putut fi determinată: ${error.message}`)
    }
}

const isValidCity = (city) => {
    // Gol? Prea scurt? Conține cifre/simboluri?
    return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s\s]+$/.test(city);
}

const mapWeather = async (mapCoords) => {
    const weather = await service.getWeatherByCoords(mapCoords.lat.toFixed(4), mapCoords.lng.toFixed(4))
    ui.displayWeather(weather)
    historyService.addLocation(weather);
    ui.renderHistory();
}

const loadDefaults = () => {


    CONFIG.DEFAULT_UNITS = localStorage.getItem('unit') || 'metric'
    // console.log(CONFIG.DEFAULT_UNITS)
    if (CONFIG.DEFAULT_UNITS === 'imperial') {
        ui.elements.unitSelect.checked = true
        ui.elements.tempUnit.textContent = "°F"
        ui.elements.windUnit.textContent = "mph"

    } else {
        ui.elements.unitSelect.checked = false
        ui.elements.tempUnit.textContent = "°C"
        ui.elements.windUnit.textContent = "m/s"
    }

    CONFIG.DEFAULT_LANG = localStorage.getItem('lang') || 'ro'
    if (CONFIG.DEFAULT_LANG === 'ro') {
        ui.elements.langSelect.value = 'ro'
    }
    else {
        ui.elements.langSelect.value = 'en'
    }

    document.querySelectorAll('.data-label').forEach(label => {
        const key = label.dataset.key;
        if (TRANSLATIONS[CONFIG.DEFAULT_LANG][key]) {
            label.textContent = TRANSLATIONS[CONFIG.DEFAULT_LANG][key];
        }
    });

    CONFIG.DEFAULT_THEME = localStorage.getItem('theme') || 'light'
    // console.log(CONFIG.DEFAULT_THEME)
    if (CONFIG.DEFAULT_THEME === 'dark') {
        ui.elements.themeSelect.checked = true;
        document.body.classList.toggle('dark');
        ui.themes.main.classList.toggle('dark');
        ui.themes.recents.classList.toggle('dark');
        ui.themes.forecast.classList.toggle('dark');
        ui.themes.map.classList.toggle('dark');
    }
    handleLocationSearch()
    // loadMapDef();
    setupEventListeners();
    ui.renderHistory();

    document.addEventListener('DOMContentLoaded', () => {
        loadMapDef();
        setTheme(CONFIG.DEFAULT_THEME)
        if (CONFIG.DEFAULT_THEME === 'dark') {
            darkLayer.addTo(map);
        }
    });

}

loadDefaults()

