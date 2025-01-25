
// Botón "No" que se mueve al pasar el ratón
const noButton = document.getElementById("no-button");
if (noButton) {
    noButton.addEventListener("mouseover", () => {
        const x = Math.random() * window.innerWidth * 0.8;
        const y = Math.random() * window.innerHeight * 0.8;
        noButton.style.position = "absolute";
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    });
} else {
    console.error("El botón con id 'no-button' no existe.");
}


// Redirección al hacer clic en "Sí"
const yesButton = document.getElementById("yes-button");
if (yesButton) {
    yesButton.addEventListener("click", () => {
        launchConfetti(); // Lanza confeti
        setTimeout(() => {
            window.location.href = "login.html"; // Redirige tras 2 segundos
        }, 5000);
    });
} else {
    console.error("El botón con id 'yes-button' no existe.");
}


//transicion al salir
// Efecto de desvanecimiento antes de redirigir
function redirectWithFade(url) {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = url;
    }, 6000); // El tiempo debe coincidir con la duración del CSS
}

// Ejemplo de uso: Redirección en "Sí"
document.getElementById("yes-button")?.addEventListener("click", () => {
    redirectWithFade("login.html");
});


//animacion
// Función para animación tipo máquina de escribir
document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.getElementById("animated-title");
    if (titleElement) {
        typeWriterEffect(titleElement, "¿Quieres ser mi San Valentín? 💖", 100);
    } else {
        console.error("El elemento con id 'animated-title' no existe.");
    }
});

function typeWriterEffect(element, text, delay = 100) {
    if (!element) {
        console.error("El elemento proporcionado no existe.");
        return;
    }

    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval); // Detén la animación
        }
    }, delay);
}

// Función para lanzar confeti
function launchConfetti() {
    confetti({
        particleCount: 150, // Número de partículas
        spread: 70,         // Ángulo de dispersión
        origin: { y: 0.6 }  // Posición de inicio en la pantalla (altura)
    });
}

function redirectWithFade(url) {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = url;
    }, 1000); // Debe coincidir con el tiempo del CSS
}

document.getElementById("yes-button")?.addEventListener("click", () => {
    redirectWithFade("login.html");
});


//sapo
document.addEventListener("DOMContentLoaded", () => {
    const sapo = document.getElementById("sapo");
    const audio = document.getElementById("background-music");
    
    if (sapo && audio) {
        sapo.addEventListener("click", () => {
            audio.currentTime = 0; // Reinicia la canción desde el inicio
            audio.play().catch(error => {
                console.error("No se pudo reproducir el audio:", error);
            });
        });
    } else {
        console.error("No se encontró el sapo o el audio en la página.");
    }
});

sapo.addEventListener("click", () => {
    const x = Math.random() * window.innerWidth * 0.8; // 80% del ancho
    const y = Math.random() * window.innerHeight * 0.8; // 80% de la altura
    sapo.style.position = "absolute";
    sapo.style.left = `${x}px`;
    sapo.style.top = `${y}px`;
});



document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("yes-button");
    const customAlert = document.getElementById("custom-alert");

    if (yesButton && customAlert) {
        yesButton.addEventListener("click", () => {
            // Mostrar el modal
            customAlert.classList.remove("hidden");

            // Ocultar el modal automáticamente después de 2 segundos
            setTimeout(() => {
                customAlert.classList.add("hidden");

                // Redirigir al login después de cerrar el modal
                window.location.href = "login.html";
            }, 2000);
        });
    } else {
        console.error("No se encontró el botón 'Sí' o el contenedor del modal.");
    }
});

