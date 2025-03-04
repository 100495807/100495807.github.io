document.addEventListener("DOMContentLoaded", () => {
    const figura = document.getElementById("figura");
    let scale = 1, rotation = 0;
    let initialDistance = 0;
    let initialAngle = 0;

    // Acelerómetro: Modifica el zoom según la inclinación
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", (event) => {
            const pitch = event.beta;  // Inclinación adelante-atrás
            const roll = event.gamma;  // Inclinación izquierda-derecha

            if (pitch !== null && roll !== null) {
                const tilt = Math.abs(pitch) + Math.abs(roll);
                scale = 1 + tilt / 90;  // Ajusta la sensibilidad
                figura.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
            } else {
                console.error("No se pudo obtener la orientación del dispositivo.");
            }
        });
    } else {
        console.error("DeviceOrientationEvent no está soportado en este dispositivo.");
    }

    // Multitouch: Pinch (zoom) y rotación
    document.addEventListener("touchstart", (e) => {
        if (e.touches.length === 2) {
            const dx = e.touches[1].clientX - e.touches[0].clientX;
            const dy = e.touches[1].clientY - e.touches[0].clientY;
            initialDistance = Math.hypot(dx, dy);
            initialAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        }
    });

    document.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2) {
            const dx = e.touches[1].clientX - e.touches[0].clientX;
            const dy = e.touches[1].clientY - e.touches[0].clientY;
            const newDistance = Math.hypot(dx, dy);
            const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

            scale *= newDistance / initialDistance;
            rotation += newAngle - initialAngle;

            figura.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

            initialDistance = newDistance;
            initialAngle = newAngle;
        }
    });
});