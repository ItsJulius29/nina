document.addEventListener("DOMContentLoaded", () => {
    const rosaLila = document.getElementById("flower");
    const audio = document.getElementById("background-music");
    let hasClicked = false;  // Variable para controlar el primer clic

    if (rosaLila && audio) {
        rosaLila.addEventListener("click", () => {
            if (!hasClicked) {
                // Primer clic: Reproducir audio y lanzar confeti
                audio.play().catch((error) => {
                    console.error("No se pudo reproducir el audio:", error);
                });

                // Lanzar el confeti
                launchConfetti();

                hasClicked = true;  // Cambiar el estado a clic realizado
            } else {
                // Segundo clic: Redirigir a la página de login y detener el audio
                audio.pause();  // Detener el audio
                audio.currentTime = 0;  // Reiniciar el audio
                window.location.href = "login.html";  // Redirigir a la página de login
            }
        });
    }
});

// Función para lanzar confeti
function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Animación tipo máquina de escribir para el título
document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.getElementById("animated-title");
    if (titleElement) {
        titleElement.innerHTML = "Feliz día de San Valentín mi monita💖";
    }
});
