# Weather App 🌦️

Aplicatie de vreme folosind JavaScript, HTML, CSS si API-uri (OpenWeatherMap, ipapi, Leaflet)

## 🚀 Features

- [x] Start automat cu vremea default
- [x] Search pentru orice oras
- [x] Validare input + erori clare
- [x] Istoric cautari recente
- [ ] (Poate) Prognoza 5+ zile

## 🆕 New Features (Part 3) - in progress

### 📍 Location History

- **Recent searches**: Quick access to previously searched locations
- **Smart duplicates**: Existing locations move to top instead of duplicating
- **Persistent storage**: History survives browser restarts
- **Configurable limit**: Maximum number of stored locations (default: 10)
- **One-click access**: Click any history item to reload weather

### 📝 Logging Service

- **Multiple levels**: Debug, Info, Warning, Error
- **Structured format**: Timestamp, level, message, and data
- **Memory management**: Configurable maximum log entries
- **Developer tools**: Export logs for debugging (dev mode)

## 🛠️ Technical Implementation

### Modular Architecture

- `modules/logger.js` - Centralized logging system
- `modules/history-service.js` - Location history management
- `modules/config.js` - Extended configuration options
- Enhanced UI controller with history rendering

### Data Persistence

- **localStorage** for history persistence
- **Error handling** for storage quota exceeded
- **JSON serialization** for complex data structures

## 🎯 Usage

### Location History

1. Search for any city
2. Check the "Recent Searches" section
3. Click any location for instant weather
4. Use "Clear History" to reset

### Developer Logs

- Open browser console to see application logs
- Different log levels for various events
- Structured data for debugging
 
## 🛠️ Tech Stack

- [HTML]
- [CSS]
- [JavaScript]

## 📦 Instalare

[Pași clari pentru oricine]

## 🗺️ Roadmap

- [x] Part 1: Fundamente
- [x] Part 2: API real
- [x] Part 3: Implementare istoric cautari
- [ ] Part 4

## 👨‍💻 Autor

![Thsi is fine](https://20627419.fs1.hubspotusercontent-na1.net/hub/20627419/hubfs/The%20Hustle/Assets/Images/1994328366-meme_20201109014803.webp?width=524&height=393&name=1994328366-meme_20201109014803.webp)