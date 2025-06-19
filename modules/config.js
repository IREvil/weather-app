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

export const TEST_DATA = {
    main: {
        "coord": { "lon": 10.99, "lat": 44.34 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "base": "stations", "main": { "temp": 287.18, "feels_like": 286.49, "temp_min": 287.18, "temp_max": 288.27, "pressure": 1019, "humidity": 71, "sea_level": 1019, "grnd_level": 954 }, "visibility": 10000, "wind": { "speed": 2.13, "deg": 223, "gust": 1.35 }, "clouds": { "all": 3 }, "dt": 1750299954, "sys": { "type": 2, "id": 2044440, "country": "IT", "sunrise": 1750303895, "sunset": 1750359793 }, "timezone": 7200, "id": 3163858, "name": "Zocca", "cod": 200
    }
}


export const apiKey = 'f5080d6b688cc653b1dd2243224b1793';

export const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;



export const defaultUnit = "celsius";
export const language = "en";
