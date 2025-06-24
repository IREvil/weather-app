import { MOCK_DATA, TEST_DATA, CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from './config.js'

const makeRequest = async (url) => {
    try {
        const response = await fetch(url)

        // Cum verifici că request-ul a fost successful?
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found")
            } else if (response.status === 401) {
                throw new Error("Unauthorized")
            }
            throw new Error("Weather API error")
        }

        return await response.json()
    } catch (error) {
        if (error.name === "TypeError") {

            throw new Error("Network error")
        }
    }
}

export const buildUrl = (endpoint, params = {}) => {
    // Cum combini base URL cu endpoint?
    const url = new URL(CONFIG.API_BASE_URL + endpoint)

    // Ce parametri sunt întotdeauna necesari?
    url.searchParams.set('appid', CONFIG.API_KEY)
    url.searchParams.set('units', CONFIG.DEFAULT_UNITS)
    url.searchParams.set('lang', CONFIG.DEFAULT_LANG)

    // Cum adaugi parametrii specifici (city, lat, lon)?
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            url.searchParams.set(key, value)
        }
    })

    return url.toString()
}

export const getCurrentWeather = async (city) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    // Simulează delay API (~1 secundă)
    // Returnează MOCK_DATA cu numele orașului actualizat
    // Gestionează erorile
    const url = buildUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city });
    return await makeRequest(url);
}

export const getWeatherByCoords = async (lat, lon) => {
    const url = buildUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon });
    return await makeRequest(url);
}

export const getCurrentWeatherWithFallback = async (city) => {
    try {
        // Încearcă API-ul real
        return await getCurrentWeather(city)
    } catch (error) {
        // Când folosești fallback?
        // Cum marchezi că datele sunt simulate?
        console.warn('Using fallback data due to:', error.message)
        return {
            ...MOCK_DATA,
            isFallback: true,
            fallbackReason: error.message,
        }
    }
}