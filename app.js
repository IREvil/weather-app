// import { elements, displayWeather, showLoading, hideLoading } from './modules/ui-controller.js';
// import { getCurrentWeather } from './modules/weather-service.js';
// if (!localStorage.getItem('unit')) localStorage.setItem('unit', 'metric');
// if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'ro');


import * as service from './modules/weather-service.js';
import { CONFIG, TRANSLATIONS, MOCK_DATA, API_ENDPOINTS, ERROR_MESSAGES } from './modules/config.js';
import * as ui from './modules/ui-controller.js';
import * as location from './modules/location-service.js'

function defaults() {
    // console.log('MOCK_DATA:', MOCK_DATA)

    // console.time('weather-test')
    // service.getCurrentWeather('Cluj').then((data) => {
    //     console.timeEnd('weather-test') // ~1000ms?
    //     console.log('Received data:', data)
    //     console.log('City updated?', data.name === 'Cluj')
    // })

    // const elements = ui.elements
    // console.log('Elements found:', Object.keys(elements))
    // ui.displayWeather(JSON.parse(JSON.stringify(MOCK_DATA.main)))
    // ui.showLoading() // Apare?
    // ui.showError('Test') // Apare?

    // console.log(
    //     'API Key configured?',
    //     CONFIG.API_KEY !== 'your_api_key_here'
    // )
    // console.log('Endpoints available:', Object.keys(API_ENDPOINTS))
    // console.log('Error messages ready:', Object.keys(ERROR_MESSAGES))

    console.log('Config updated:', CONFIG)
    console.log('Max history:', CONFIG.MAX_HISTORY_ITEMS)

}

// import('./modules/config.js').then((config) => {
//     console.log('MOCK_DATA:', config.MOCK_DATA)
// })

// import('./modules/weather-service.js').then((service) => {
//     console.time('weather-test')
//     service.getCurrentWeather('Cluj').then((data) => {
//         console.timeEnd('weather-test') // ~1000ms?
//         console.log('Received data:', data)
//         console.log('City updated?', data.name === 'Cluj')
//     })
// })

// Promise.all([
//     import('./modules/ui-controller.js'),
//     import('./modules/config.js')
// ]).then(([ui, config]) => {
//     const elements = ui.elements
//     console.log('Elements found:', Object.keys(elements))
//     ui.displayWeather(JSON.parse(JSON.stringify(config.MOCK_DATA.main)))
//     ui.showLoading() // Apare?
//     ui.showError('Test') // Apare?
// })

let tempData;

const setupEventListeners = () => {
    // Submit în form (enter din search field sau click pe buton)
    ui.elements.searchButton.addEventListener('click', handleSearch);
    document.querySelector('#city-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    // document.querySelector("#unit-select")
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
            // convertedTemp = ((currentTemp - 32) * 5 / 9).toFixed(1);
            // ui.elements.temperatureInfo.textContent = convertedTemp
            service.getCurrentWeather(ui.elements.locationInfo.textContent).then((data) => {
                ui.displayWeather(data)
            })
        }
    })

    ui.elements.themeSelect.addEventListener('change', function () {
        const theme = this.checked ? "dark" : "light";
        CONFIG.DEFAULT_THEME = theme;
        localStorage.setItem('theme', theme);
        document.body.classList.toggle('dark');
        ui.themes.main.classList.toggle('dark');
        ui.themes.recents.classList.toggle('dark');
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
}

const handleSearch = async () => {
    const city = document.querySelector('#city-input').value.trim();
    // const city = cityInput[0].toUpperCase() + cityInput.slice(1).toLowerCase();

    // const city = new FormData(event.target).get("city");
    // Validează input
    if (!isValidCity(city)) {
        console.error('Nume invalid');
        return;
    }
    // Arată loading
    ui.showLoading();
    // Apelează weather service
    try {
        const weatherData = await service.getCurrentWeatherWithFallback(city).then((data) => {
            console.log('Real data received:', data)
            console.log('Has temperature?', data.main?.temp !== undefined)
            console.log('Has description?', data.weather?.[0]?.description !== undefined)
            return (data)
        })
        // Ascunde loading, arată rezultat
        ui.hideLoading();
        ui.displayWeather(weatherData);
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
        ui.hideLoading();
        ui.displayWeather(weather)
    } catch (error) {
        // Cum gestionezi când nici un serviciu de locație nu funcționează?
        ui.showError(`Locația nu a putut fi determinată: ${error.message}`)
    }
}

const isValidCity = (city) => {
    // Gol? Prea scurt? Conține cifre/simboluri?// ... existing code ...
    return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s\s]+$/.test(city);
}


const loadDefaults = () => {


    CONFIG.DEFAULT_UNITS = localStorage.getItem('unit') || 'metric'
    console.log(CONFIG.DEFAULT_UNITS)
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

    const lang = CONFIG.DEFAULT_LANG

    document.querySelectorAll('.data-label').forEach(label => {
        const key = label.dataset.key;
        if (TRANSLATIONS[lang][key]) {
            label.textContent = TRANSLATIONS[lang][key];
        }
    });

    CONFIG.DEFAULT_THEME = localStorage.getItem('theme') || 'light'
    console.log(CONFIG.DEFAULT_THEME)
    if (CONFIG.DEFAULT_THEME === 'dark') {
        ui.elements.themeSelect.checked = true;
        document.body.classList.toggle('dark');
        ui.themes.main.classList.toggle('dark');
        ui.themes.recents.classList.toggle('dark');
    } else {
        ui.elements.themeSelect.checked = false
        document.body.classList.toggle('light');
        ui.themes.main.classList.toggle('light');
        ui.themes.recents.classList.toggle('light');
    }

    handleLocationSearch()
    setupEventListeners();
}

const setTheme = () => {

}
// Pornește setupEventListeners și displayWeather pentru a rula aplicația
// defaults();
loadDefaults()


// Get current language from localStorage

// Get all .data-label elements


// ui.elements.unitSelect.addEventListener('change', async (e) => {
//     CONFIG.DEFAULT_UNITS = e.target.value
//     // Cum reîncărci vremea cu noile setări?
//     // Cum actualizezi afișarea existentă?
// })
