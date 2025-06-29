import { CONFIG } from './config.js';


export const elements = {
    loading: document.querySelector('#loading'),
    error: document.querySelector('#error'),
    message: document.querySelector('#message'),
    cityInput: document.querySelector('#city-input'),
    searchButton: document.querySelector('#search-btn'),
    weatherInfo: document.querySelector('#weather-info'),
    locationInfo: document.querySelector('#location'),
    weatherIcon: document.querySelector('#weather-icon'),
    temperatureInfo: document.querySelector('#temperature'),
    tempUnit: document.querySelector('#temp-unit'),
    descriptionInfo: document.querySelector('#description'),
    windInfo: document.querySelector('#wind'),
    windUnit: document.querySelector('#wind-unit'),
    humidityInfo: document.querySelector('#humidity'),
    pressureInfo: document.querySelector('#pressure'),
    visibilityInfo: document.querySelector('#visibility'),
    unitSelect: document.querySelector('#unit-select'),
    langSelect: document.querySelector('#lang-select'),
    themeSelect: document.querySelector('#theme-select'),
}

export const themes = {
    main: document.querySelector('#app'),
    recents: document.querySelector('#history-block'),
}

export function showLoading() {
    elements.error.classList.remove("hidden");
    elements.weatherInfo.classList.add("hidden");
}

export function hideLoading() {
    elements.weatherInfo.classList.remove("hidden");
    elements.error.classList.add("hidden");
}

export function showError(message) {
    console.error(`Error: ${message}`)
    elements.error.textContent = message;
    elements.error.classList.remove("hidden");
    elements.weatherInfo.classList.add("hidden");
}


export function showMessage(message) {
    console.log(`Message: ${message}`)
    elements.message.textContent = message;
    elements.message.classList.remove("hidden");
    elements.message.styles = "fontSize: 1.5px"
    // elements.error.classList.toggle("warning", type === "warning");
}

export const displayWeather = (weatherData) => {

    elements.locationInfo.textContent = `${weatherData.name}`
    elements.descriptionInfo.textContent = weatherData.weather[0].description
    elements.temperatureInfo.textContent = weatherData.main.temp.toFixed(1)
    elements.windInfo.textContent = weatherData.wind.speed
    elements.humidityInfo.textContent = weatherData.main.humidity + '%'
    elements.pressureInfo.textContent = weatherData.main.pressure + ' hPa'
    elements.visibilityInfo.textContent = weatherData.visibility + ' m'
    elements.weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    elements.cityInput.value = ''
}

export const langSwitch = (lang) => {
    elements
}
// <p>Temperature: ${((weatherData.main.temp - 32) * 5 / 9).toFixed(0)}°C</p

export function getCityInput() {
    return elements.cityInput.value
}

export function clearInput() {
    elements.cityInput.value = ''
}


// Funcție pentru actualizarea simbolului temperaturii
export const updateTemperatureDisplay = (elements, temperature, unit) => {
    // Cum afișezi temperatura cu simbolul corect?
    // °C pentru metric, °F pentru imperial?
    const symbol = /* ce logică folosești? */
        elements.temperature.textContent = `${temperature}${symbol}`
}

// Funcție pentru salvarea preferințelor
export const saveUserPreferences = (unit, lang) => {
    // Cum folosești localStorage?
    // Ce chei folosești pentru stocare?
    localStorage.setItem('weather-unit', unit)
    localStorage.setItem('language', lang)
}

// Funcție pentru încărcarea preferințelor
export const loadUserPreferences = () => {
    // Cum citești din localStorage?
    // Ce valori default folosești dacă nu există preferințe?
    return {
        unit: localStorage.getItem('unit') || 'metric',
        lang: localStorage.getItem('lang') || 'ro',
        theme: localStorage.getItem('theme') || 'light',
    }

}