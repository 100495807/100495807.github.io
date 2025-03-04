Ejemplo Básico de Leaflet con Geolocalización
Este proyecto demuestra cómo utilizar la biblioteca Leaflet 
para crear un mapa interactivo y cómo integrar la API de
Geolocalización para obtener la ubicación actual del usuario. 
El usuario puede hacer clic en el mapa para seleccionar un destino,
 y el sistema calculará la distancia entre la ubicación del usuario
y el destino seleccionado.

Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos:

index.html: Contiene la estructura HTML y carga los estilos 
            y scripts necesarios.
style.css: Define los estilos para el mapa y la página.
ej1.js: Contiene la lógica para inicializar el mapa, 
        manejar la geolocalización y calcular la distancia 
        entre el usuario y el destino seleccionado.

Funcionalidades
Al cargar la página, el mapa se centra en la ubicación actual del usuario (si está permitido).
El usuario puede hacer clic en cualquier lugar del mapa para seleccionar un destino.
Se calcula y muestra la distancia entre la ubicación del usuario y el destino seleccionado.
Si el usuario se encuentra a menos de 50 metros del destino, se muestra una notificación.