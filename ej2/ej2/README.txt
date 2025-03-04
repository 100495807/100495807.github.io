Acelerómetro y Multitáctil

Este proyecto utiliza el acelerómetro del dispositivo para mover una 
imagen según la inclinación del dispositivo, y también soporta gestos 
multitáctiles como zoom (pinch) y rotación. La imagen en el centro de 
la pantalla se mueve, escala y rota dependiendo de los gestos del usuario.

Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos:

index.html: Contiene la estructura básica de la página y carga los archivos CSS y JavaScript necesarios.
styles.css: Define el estilo de la página y el contenedor que mantiene la imagen.
script.js: Contiene la lógica para capturar la orientación del dispositivo y los gestos multitáctiles.


Funcionalidades

Acelerómetro: Mueve la imagen según la inclinación del dispositivo. La orientación del dispositivo (pitch y roll) determina el movimiento en los ejes X y Y.
Multitáctil: Detecta gestos de "pinch to zoom" y rotación con dos dedos, permitiendo escalar y rotar la imagen en función de la interacción del usuario.