
export let map = L.map('map').setView([44.44, 26.10], 13);

export const loadMapDef = () => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

let popup = L.popup();

export function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`Selectat: ${e.latlng.lat.toFixed(2)} / ${e.latlng.lng.toFixed(2)}`)
        .openOn(map);
}
