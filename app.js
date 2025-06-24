// import { elements, displayWeather, showLoading, hideLoading } from './modules/ui-controller.js';
// import { getCurrentWeather } from './modules/weather-service.js';



import * as service from './modules/weather-service.js';
import * as config from './modules/config.js';
import * as ui from './modules/ui-controller.js';
import * as location from './modules/location-service.js'

function defaults() {
    console.log('MOCK_DATA:', config.MOCK_DATA)

    console.time('weather-test')
    service.getCurrentWeather('Cluj').then((data) => {
        console.timeEnd('weather-test') // ~1000ms?
        console.log('Received data:', data)
        console.log('City updated?', data.name === 'Cluj')
    })

    const elements = ui.elements
    console.log('Elements found:', Object.keys(elements))
    ui.displayWeather(JSON.parse(JSON.stringify(config.MOCK_DATA.main)))
    ui.showLoading() // Apare?
    ui.showError('Test') // Apare?

    console.log(
        'API Key configured?',
        config.CONFIG.API_KEY !== 'your_api_key_here'
    )
    console.log('Endpoints available:', Object.keys(config.API_ENDPOINTS))
    console.log('Error messages ready:', Object.keys(config.ERROR_MESSAGES))
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


const setupEventListeners = () => {
    // Submit în form (enter din search field sau click pe buton)
    document.querySelector('#search-btn').addEventListener('click', handleSearch);
    document.querySelector('#city-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

const handleSearch = async () => {
    const cityInput = document.querySelector('#city-input').value.trim();
    const city = cityInput[0].toUpperCase() + cityInput.slice(1).toLowerCase();
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
        console.log(weather);
        ui.displayWeather(weather)
    } catch (error) {
        // Cum gestionezi când nici un serviciu de locație nu funcționează?
        ui.showError(`Locația nu a putut fi determinată: ${error.message}`)
    }
}

const isValidCity = (city) => {
    // Gol? Prea scurt? Conține cifre/simboluri?
    return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\\s-]+$/.test(city)
}

// Pornește setupEventListeners și displayWeather pentru a rula aplicația
// defaults();
handleLocationSearch()
setupEventListeners();

// location.getCoords().then((coords) => {
//     console.log('Coords received:', coords)
//     console.log('Has lat/lon?', coords.latitude && coords.longitude)
//     console.log('Source:', coords.source)
// })

// Testează cu un oraș invalid
// service.getCurrentWeather('CityThatDoesNotExist123').catch((error) => {
//     console.log('Error handled gracefully?', error.message.length > 0)
//     console.log('User-friendly message?', !error.message.includes('404'))
// })
// const testUrl = service.buildUrl('/weather', { q: 'Oradea' })
// console.log(
//     'URL correct?',
//     testUrl.includes('Oradea') && testUrl.includes('appid')
// )

// service.getCurrentWeather('Oradea').then((data) => {
//     console.log('Real data received:', data)
//     console.log('Has temperature?', data.main?.temp !== undefined)
//     console.log('Has description?', data.weather?.[0]?.description !== undefined)
// })

