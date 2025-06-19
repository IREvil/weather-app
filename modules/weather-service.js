import { MOCK_DATA } from './config.js'

export const getCurrentWeather = async (city) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Simulează delay API (~1 secundă)
    // Returnează MOCK_DATA cu numele orașului actualizat
    // Gestionează erorile
    const data = JSON.parse(JSON.stringify(MOCK_DATA.main))
    data.name = city
    return data
}

export const getWeatherByCoords = async (lat, lon) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Similar, dar pentru coordonate
    const data = JSON.parse(JSON.stringify(MOCK_DATA.main))
    data.coord = { lat, lon }
    return data
}