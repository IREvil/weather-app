import { CONFIG } from "./config.js";

export let map = L.map('map').setView([45.75, 24.6], 7);

export const loadMapDef = () => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

let popup = L.popup();

export function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`Selectat: ${e.latlng.lat.toFixed(2)} / ${e.latlng.lng.toFixed(2)}`)
        .openOn(map);
}


const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 20
});

const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics',
    maxZoom: 20
});

const satelliteLabels = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Labels © Esri',
    maxZoom: 20,
    pane: 'overlayPane' // default
});


export let currentTheme = 'light';
export let satelliteEnabled = false;

export let currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

export function setTheme(theme) {
    if (satelliteEnabled) return;

    map.removeLayer(currentLayer);
    currentTheme = theme;
    if (theme === 'dark') {
        currentLayer = darkLayer;
        map.removeLayer(heatLayer);
    } else {
        currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20
        });
        map.removeLayer(heatLayer);
    }
    currentLayer.addTo(map);
}

export const SatelliteToggle = L.Control.extend({
    options: { position: 'topright' },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const button = L.DomUtil.create('a', '', container);

        button.innerHTML = '🛰️';
        button.href = '#';
        button.title = 'Toggle Satellite View';

        L.DomEvent.disableClickPropagation(container);

        L.DomEvent.on(button, 'click', function (e) {
            L.DomEvent.preventDefault(e);

            if (!satelliteEnabled) {
                // map.removeLayer(currentLayer);
                satelliteLayer.addTo(map);
                satelliteLabels.addTo(map)
                satelliteEnabled = true;
                map.removeLayer(heatLayer);
            } else {
                map.removeLayer(satelliteLayer);
                map.removeLayer(satelliteLabels);
                satelliteEnabled = false;
                setTheme(CONFIG.DEFAULT_THEME);
                map.removeLayer(heatLayer);
            }
        });

        return container;
    }
});

map.addControl(new SatelliteToggle());


const heatLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${CONFIG.API_KEY}`, {
    attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
    maxZoom: 19,
});


export const HeatmapToggle = L.Control.extend({
    options: { position: 'topright' },
    onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const button = L.DomUtil.create('a', '', container);

        button.innerHTML = '🔥';
        button.href = '#';
        button.title = 'Toggle Heatmap';

        L.DomEvent.disableClickPropagation(container);

        L.DomEvent.on(button, 'click', function (e) {
            L.DomEvent.preventDefault(e);

            if (!map.hasLayer(heatLayer)) {
                heatLayer.addTo(map);
            } else {
                map.removeLayer(heatLayer);
            }
        });

        return container;
    }
});

map.addControl(new HeatmapToggle());