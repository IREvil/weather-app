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

import('./modules/ui-controller.js').then((ui) => {
    const elements = ui.elements
    console.log('Elements found:', Object.keys(elements))
})

ui.showLoading() // Apare?
ui.showError('Test') // Apare?

import('./modules/config.js').then((config) => {
    ui.displayWeather(config.MOCK_DATA) // Arată frumos?
})


const setupEventListeners = () => {
    // Submit în form (enter din search field sau click pe buton)
}

const handleSearch = async () => {
    // Validează input
    // Arată loading
    // Apelează weather service
    // Ascunde loading, arată rezultat
    // Gestionează erorile
}

const isValidCity = (city) => {
    // Gol? Prea scurt? Conține cifre/simboluri?
    return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\\s-]+$/.test(city)
}

// Pornește setupEventListeners și displayWeather pentru a rula aplicația