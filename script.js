const mymap = L.map('sample_map').setView([40.741, -3.884], 15);

// Cargar el mapa con OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(mymap);

// Variables globales
let destinationMarker = null;
let destinationCoords = null;
let userMarker = null;

// Evento para que el usuario elija un destino en el mapa
mymap.on('click', function(e) {
    // Si ya hay un marcador, lo eliminamos
    if (destinationMarker) {
        mymap.removeLayer(destinationMarker);
    }

    // Agregar marcador en la ubicación seleccionada
    destinationCoords = e.latlng;
    destinationMarker = L.marker(destinationCoords).addTo(mymap)
        .bindPopup("Destino seleccionado").openPopup();

    console.log("Destino establecido en:", destinationCoords);
});

// Función para calcular distancia entre dos puntos en metros
function calculateDistance(latA, lonA, latB, lonB) {
    const earthRadius = 6371000; // Radio de la Tierra en metros
    const latRadA = latA * Math.PI / 180;
    const latRadB = latB * Math.PI / 180;
    const deltaLat = (latB - latA) * Math.PI / 180;
    const deltaLon = (lonB - lonA) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(latRadA) * Math.cos(latRadB) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
}

// Obtener ubicación actual y verificar proximidad al destino
function checkUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            // Si ya hay un marcador de usuario, lo eliminamos
            if (userMarker) {
                mymap.removeLayer(userMarker);
            }

            // Agregar marcador en la ubicación actual del usuario
            userMarker = L.marker([userLat, userLon]).addTo(mymap)
                .bindPopup("Tu ubicación actual").openPopup();

            // Centrar el mapa en la ubicación actual del usuario
            mymap.setView([userLat, userLon], 15);

            if (destinationCoords) {
                const distance = calculateDistance(userLat, userLon, destinationCoords.lat, destinationCoords.lng);
                console.log(`Distancia al destino: ${distance.toFixed(2)} metros`);

                if (distance < 50) { // Notificación si está a menos de 50m
                    alert("¡Estás cerca de tu destino!");
                }
            }
        }, (error) => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.error("Permiso de geolocalización denegado.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Información de ubicación no disponible.");
                    break;
                case error.TIMEOUT:
                    console.error("La solicitud de geolocalización ha caducado.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.error("Error desconocido.");
                    break;
            }
        });
    } else {
        console.error("Geolocalización no soportada en este navegador.");
    }
}

// Monitorear la ubicación del usuario cada 5 segundos
setInterval(checkUserLocation, 5000);

// Obtener la ubicación inicial del usuario al cargar la página
checkUserLocation();