import { historyService } from './history-service.js';
import { logger } from './logger.js';

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
    historyTitle: document.querySelector('#history-title'),
    historyBlock: document.querySelector('#history'),
}

export const forecast = {

}

export const themes = {
    main: document.querySelector('#app'),
    recents: document.querySelector('#history-block'),
    forecast: document.querySelector('#forecast-block'),
    map: document.querySelector('#geo-block')
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
    logger.error('Error:', message)
    elements.error.textContent = message;
    elements.error.classList.remove("hidden");
    elements.weatherInfo.classList.add("hidden");
}


export function showMessage(message) {
    logger.info('Message:', message)
    elements.message.textContent = message;
    elements.message.classList.remove("hidden");
    elements.message.styles = "fontSize: 1.5px"
}

export function clearMessage() {
    elements.message.textContent = '';
    elements.message.classList.add("hidden");
}

export const displayWeather = (weatherData) => {

    const desc = weatherData.weather[0].description

    elements.locationInfo.textContent = weatherData.name
    elements.descriptionInfo.textContent = desc.charAt(0).toUpperCase() + desc.slice(1)
    elements.temperatureInfo.textContent = weatherData.main.temp.toFixed(1)
    elements.windInfo.textContent = weatherData.wind.speed
    elements.humidityInfo.textContent = weatherData.main.humidity + '%'
    elements.pressureInfo.textContent = weatherData.main.pressure + ' hPa'
    elements.visibilityInfo.textContent = weatherData.visibility + ' m'
    elements.weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    elements.cityInput.value = ''
}


export function getCityInput() {
    return elements.cityInput.value
}

export function clearInput() {
    elements.cityInput.value = ''
}

export const updateTemperatureDisplay = (elements, temperature, unit) => {
    const symbol = elements.temperature.textContent = `${temperature}${symbol}`
}

export const saveUserPreferences = (unit, lang) => {
    localStorage.setItem('weather-unit', unit)
    localStorage.setItem('language', lang)
}

export const loadUserPreferences = () => {
    return {
        unit: localStorage.getItem('unit') || 'metric',
        lang: localStorage.getItem('lang') || 'ro',
        theme: localStorage.getItem('theme') || 'light',
    }

}

export const renderHistory = () => {
    const history = historyService.getHistory();
    let list = '<div class="history-list">';
    if (history.length === 0) {
        list += '<span class="history-empty">(fără istoric)</span>';
    } else {
        for (const city of history) {
            list += `<div class="history-chip">
                <span class="history-city" data-city="${city}">${city}</span>
                <button class="clear-btn" data-city="${city}" title="Șterge">×</button>
            </div>`;
        }
    }
    list += '</div>';
    if (history.length > 0) {
        list += `<button id="clear-history-all">Șterge tot istoricul</button>`;
    }
    elements.historyBlock.innerHTML = list;
}

export function renderForecast(forecastData) {
    const container = document.getElementById('forecast-cards');
    if (!forecastData || !forecastData.list) {
        container.innerHTML = '<p>No forecast data available.</p>';
        return;
    }

    const days = {};
    forecastData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!days[date]) days[date] = [];
        days[date].push(item);
    });

    const dayKeys = Object.keys(days).slice(0, 5);

    container.innerHTML = dayKeys.map(date => {
        const dayData = days[date];
        const midday = dayData.reduce((prev, curr) => {
            return Math.abs(new Date(curr.dt_txt).getHours() - 12) <
                Math.abs(new Date(prev.dt_txt).getHours() - 12) ? curr : prev;
        });

        return `
            <div class="forecast-card">
                <div>${new Date(date).toLocaleDateString()}</div>
                <img src="http://openweathermap.org/img/wn/${midday.weather[0].icon}@2x.png" alt="${midday.weather[0].description}">
                <div>${midday.weather[0].description}</div>
                <div>${midday.main.temp.toFixed(1)}°</div>
            </div>
        `;
    }).join('');
}