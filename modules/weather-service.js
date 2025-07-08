import { MOCK_DATA, CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from './config.js'
import { logger } from './logger.js'

export const makeRequest = async (url) => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            if (response.status === 404) {
                logger.error("City not found")
            } else if (response.status === 401) {
                logger.error("Unauthorized")
            }
            logger.error("Weather API error")
        }

        return await response.json()
    } catch (error) {
        if (error.name === "TypeError") {

            logger.error('Network error')
        }
    }
}

export const buildUrl = (endpoint, params = {}) => {
    const url = new URL(CONFIG.API_BASE_URL + endpoint)

    url.searchParams.set('appid', CONFIG.API_KEY)
    url.searchParams.set('units', CONFIG.DEFAULT_UNITS)
    url.searchParams.set('lang', CONFIG.DEFAULT_LANG)

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            url.searchParams.set(key, value)
        }
    })

    return url.toString()
}

export const getCurrentWeather = async (city) => {
    const url = buildUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city });
    return await makeRequest(url);
}

export const getWeatherByCoords = async (lat, lon) => {
    const url = buildUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon });
    return await makeRequest(url);
}

export const getCurrentWeatherWithFallback = async (city) => {
    try {
        return await getCurrentWeather(city)
    } catch (error) {
        logger.warn('Using fallback data due to:', error.message)
        return {
            ...MOCK_DATA,
            isFallback: true,
            fallbackReason: error.message,
        }
    }
}