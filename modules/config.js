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

export const apiKey = 'f5080d6b688cc653b1dd2243224b1793';

export const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;



export const defaultUnit = "celsius";
export const language = "en";
