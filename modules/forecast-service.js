import { API_ENDPOINTS } from './config.js';
import { buildUrl, makeRequest } from './weather-service.js';

export const getForecastByCoords = async (lat, lon) => {
    const url = buildUrl(API_ENDPOINTS.FORECAST, { lat, lon });
    return await makeRequest(url);
}

export const getForecastByCity = async (city) => {
    const url = buildUrl(API_ENDPOINTS.FORECAST, { q: city });
    return await makeRequest(url);
}