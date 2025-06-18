export const getCurrentWeather = async (city) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Simulează delay API (~1 secundă)
    // Returnează MOCK_DATA cu numele orașului actualizat
    // Gestionează erorile
}

export const getWeatherByCoords = async (lat, lon) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Similar, dar pentru coordonate
}