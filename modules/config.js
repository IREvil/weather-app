let API_KEY;

try {
    ({ API_KEY } = await import('./api-stuff.js'));
} catch {
    ({ API_KEY } = await import('./apiKey.js'));
}


export const MOCK_DATA = {
    main: {
        "coord": {
            "lon": 7.367,
            "lat": 45.133
        },
        "weather": [
            {
                "id": 501,
                "main": "Rain",
                "description": "moderate rain",
                "icon": "10d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 284.2,
            "feels_like": 282.93,
            "temp_min": 283.06,
            "temp_max": 286.82,
            "pressure": 1021,
            "humidity": 60,
            "sea_level": 1021,
            "grnd_level": 910
        },
        "visibility": 10000,
        "wind": {
            "speed": 4.09,
            "deg": 121,
            "gust": 3.47
        },
        "rain": {
            "1h": 2.73
        },
        "clouds": {
            "all": 83
        },
        "dt": 1726660758,
        "sys": {
            "type": 1,
            "id": 6736,
            "country": "IT",
            "sunrise": 1726636384,
            "sunset": 1726680975
        },
        "timezone": 7200,
        "id": 3165523,
        "name": "Province of Turin",
        "cod": 200
    }
}

export const CONFIG = {
    API_KEY: API_KEY,
    API_BASE_URL: 'https://api.openweathermap.org/data/2.5/',
    DEFAULT_UNITS: 'metric',
    DEFAULT_LANG: 'ro',
    DEFAULT_THEME: 'light',
    MAX_HISTORY_ITEMS: 10,
    STORAGE_KEYS: {
        SEARCH_HISTORY: 'weather_search_history',
        USER_PREFERENCES: 'weather_user_prefs',
    },
    LOGGING: {
        ENABLED: false,
        LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
        MAX_LOGS: 100,
    },
}

// Cum organizezi endpoint-urile pentru a fi ușor de găsit?
export const API_ENDPOINTS = {
    CURRENT_WEATHER: '/weather',
    FORECAST: '/forecast',
    AIR_QUALITY: '/air_pollution',
    WEATHER_ALERTS: '/alerts',
}

// Ce mesaje sunt utile când ceva merge prost?
export const ERROR_MESSAGES = {
    CITY_NOT_FOUND: 'Orasul nu a fost gasit',
    NETWORK_ERROR: 'Eroarea de conexiune',
    PERMISSION_DENIED: 'Accesul la locatie a fost refuzat',
    LOCATION_NOT_AVAILABLE: 'Locația nu a putut fi preluata',
    GENERIC_ERROR: 'A aparut o eroare necunoscuta',
}

export const TRANSLATIONS = {
    ro: {
        title: "Vreme",
        humidity: "Umiditate:",
        pressure: "Presiune:",
        wind: "Vânt:",
        visibility: "Vizibilitate:",
        history: "Căutări recente",
    },
    en: {
        title: "Weather",
        humidity: "Humidity:",
        pressure: "Pressure:",
        wind: "Wind:",
        visibility: "Visibility:",
        history: "Recent searches",
    }
};