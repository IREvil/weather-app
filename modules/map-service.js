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

export const darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
    maxZoom: 20
});

export const satelliteLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
    maxZoom: 20
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
    } else {
        currentLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20
        });
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
                satelliteEnabled = true;
            } else {
                map.removeLayer(satelliteLayer);
                satelliteEnabled = false;
            }
        });

        return container;
    }
});

map.addControl(new SatelliteToggle());
