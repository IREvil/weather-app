// import { elements, displayWeather, showLoading, hideLoading } from './modules/ui-controller.js';
// import { getCurrentWeather } from './modules/weather-service.js';



import * as service from './modules/weather-service.js';
import * as config from './modules/config.js';
import * as ui from './modules/ui-controller.js';


import('./modules/config.js').then((config) => {
    console.log('MOCK_DATA:', config.MOCK_DATA)
})

import('./modules/weather-service.js').then((service) => {
    console.time('weather-test')
    service.getCurrentWeather('Cluj').then((data) => {
        console.timeEnd('weather-test') // ~1000ms?
        console.log('Received data:', data)
        console.log('City updated?', data.name === 'Cluj')
    })
})

Promise.all([
    import('./modules/ui-controller.js'),
    import('./modules/config.js')
]).then(([ui, config]) => {
    const elements = ui.elements
    console.log('Elements found:', Object.keys(elements))
    ui.displayWeather(JSON.parse(JSON.stringify(config.MOCK_DATA.main)))
    ui.showLoading() // Apare?
    ui.showError('Test') // Apare?
})


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
    const city = document.querySelector('#city-input').value.trim();
    // Validează input
    if (!isValidCity(city)) {
        console.error('Nume invalid');
        return;
    }
    // Arată loading
    ui.showLoading();
    // Apelează weather service
    try {
        const weatherData = await service.getCurrentWeather(city);
        console.log(weatherData)
        // Ascunde loading, arată rezultat
        ui.hideLoading();

        ui.displayWeather(weatherData);
    }
    // Gestionează erorile
    catch (error) {
        console.error(error);
        showError('Nu s-au gasit date pentru acest oras');
    }
}

const isValidCity = (city) => {
    // Gol? Prea scurt? Conține cifre/simboluri?
    return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\\s-]+$/.test(city)
}

// Pornește setupEventListeners și displayWeather pentru a rula aplicația
setupEventListeners();
