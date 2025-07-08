
import { logger } from "./logger.js"

export const getCoords = () => new Promise((resolve, reject) => {

    const fallbackToIp = async () => {
        try {
            const response = await fetch("https://ipapi.co/json/")
            const data = await response.json()

            resolve({
                latitude: data.latitude,
                longitude: data.longitude,
                source: 'ip',
                accuracy: 'city',
            })
        } catch (error) {
            logger.error('Nu am putut determina locația: ', error.message)
        }
    }

    if (!navigator.geolocation) {
        return fallbackToIp()
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                source: 'gps',
                accuracy: 'precise',
            })

        },
        (error) => {
            let errorType;
            switch (error.code) {
                case 1:
                    errorType = 'PERMISSION_DENIED';
                    break;
                case 2:
                    errorType = 'POSITION_UNAVAILABLE';
                    break;
                case 3:
                    errorType = 'TIMEOUT';
                    break;
                default:
                    errorType = 'UNKNOWN_ERROR';
            }
            logger.warn(`Geolocation failed - [${errorType}]: ${error.message}`);
            fallbackToIp()
        },
        {
            timeout: 5000,
            enableHighAccuracy: true,
            maximumAge: 1200000,
        }
    )
})