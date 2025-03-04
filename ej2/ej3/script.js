document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("imagen");
    let scale = 1, rotation = 0;
    let initialDistance = 0;
    let initialAngle = 0;

    // Acelerómetro: Modifica el zoom según la inclinación
    if (window.Accelerometer) {
        let sensor = new Accelerometer({ frequency: 60 });
        sensor.addEventListener("reading", () => {
            let tilt = Math.abs(sensor.x) + Math.abs(sensor.y);
            scale = 1 + tilt / 20;
            img.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        });
        sensor.start();
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

            img.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

            initialDistance = newDistance;
            initialAngle = newAngle;
        }
    });
});
