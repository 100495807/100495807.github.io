document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("imagen");
    if (!img) {
        console.error("Elemento con ID 'imagen' no encontrado.");
        return;
    }

    let scale = 1, rotation = 0;

    // Acelerómetro: Mueve la imagen con inclinación
    window.addEventListener("deviceorientation", (event) => {
        const pitch = event.beta;  // Inclinación adelante-atrás
        const roll = event.gamma;  // Inclinación izquierda-derecha

        const x = roll * 2;  // Ajusta la sensibilidad
        const y = pitch * 2;

        img.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`;
    });

    // Multitouch: Pinch (zoom) y rotación
    let initialDistance = 0;
    let initialAngle = 0;

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

            img.style.transform = `translate(${dx}px, ${dy}px) scale(${scale}) rotate(${rotation}deg)`;

            initialDistance = newDistance;
            initialAngle = newAngle;
        }
    });
});