:/Users/Jorge/Documents/GitHub/100495807.github.io/ej2/script.js
const movable = document.getElementById('movable');
let startX = window.innerWidth / 2;
let startY = window.innerHeight / 2;

// Mover el elemento basado en la inclinación del dispositivo
window.addEventListener('deviceorientation', (event) => {
    const pitch = event.beta; // Inclinación hacia adelante/atrás
    const roll = event.gamma; // Inclinación hacia izquierda/derecha

    // Calcular nueva posición
    const newX = startX + roll * 2;
    const newY = startY + pitch * 2;

    // Mover el elemento
    movable.style.transform = `translate(${newX}px, ${newY}px)`;
});

// Variables para multitáctil
let initialDistance = null;
let initialAngle = null;

// Capturar eventos multitáctiles
movable.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
        initialDistance = getDistance(event.touches);
        initialAngle = getAngle(event.touches);
    }
});

movable.addEventListener('touchmove', (event) => {
    if (event.touches.length === 2) {
        const currentDistance = getDistance(event.touches);
        const currentAngle = getAngle(event.touches);

        // Detectar zoom (pinch)
        const scale = currentDistance / initialDistance;
        movable.style.transform += ` scale(${scale})`;

        // Detectar rotación
        const rotation = currentAngle - initialAngle;
        movable.style.transform += ` rotate(${rotation}deg)`;
    }
});

function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function getAngle(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
}