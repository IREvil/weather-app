export const elements = {
    cityInput: document.querySelector('#city-input'),
    searchButton: document.querySelector('#searchButton'),
    weatherInfo: document.querySelector('#weather-info'),
    locationInfo: document.querySelector('#location'),
    temperatureInfo: document.querySelector('#temperature'),
    descriptionInfo: document.querySelector('#description'),
    windInfo: document.querySelector('#wind'),
    humidityInfo: document.querySelector('#humidity'),
    pressureInfo: document.querySelector('#pressure'),
    visibilityInfo: document.querySelector('#visibility'),
}

export function showLoading() {
    console.log('loading')
}

export function hideLoading() {
    console.log('hide loading')
}

export function showError(message) {
    console.error(`Error: ${message}`)
}

export const displayWeather = (weatherData) => {

    elements.weatherInfo.innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${((weatherData.main.temp - 32) * 5 / 9).toFixed(0)}°C</p>
        <p>Description: ${weatherData.weather[0].description}</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Pressure: ${weatherData.main.pressure} hPa</p>
       <p>Visibility: ${weatherData.visibility} m</p>
    `


    console.log(weatherData)
}

export function getCityInput() {
    return elements.cityInput.value
}

export function clearInput() {
    elements.cityInput.value = ''
}