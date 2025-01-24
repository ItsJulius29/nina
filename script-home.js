
function controlMusic(action) {
    // Crear o reutilizar la instancia de audio
    if (!controlMusic.audioInstance) {
        controlMusic.audioInstance = new Audio("music/music1.mp3");
    }
    const audio = controlMusic.audioInstance;

    switch (action) {
        case "play":
            if (audio.paused || audio.ended) {
                audio.play().then(() => {
                    console.log("Música reproduciéndose");
                }).catch(error => {
                    console.error("Error al reproducir música:", error);
                });
            } else {
                console.log("La música ya está en reproducción.");
            }
            break;

        case "pause":
            if (!audio.paused) {
                audio.pause();
                console.log("Música pausada");
            } else {
                console.log("La música ya está pausada.");
            }
            break;

        case "stop":
            if (!audio.paused || audio.currentTime > 0) {
                audio.pause();
                audio.currentTime = 0; // Reiniciar al principio
                console.log("Música detenida");
            } else {
                console.log("No hay música para detener.");
            }
            break;

        default:
            console.log("Acción no válida. Usa 'play', 'pause' o 'stop'.");
    }
}

function cambiarMensaje() {
    const message = document.getElementById("hidden-message");
    const toggleButton = document.getElementById("toggle-button");

    // Alternar la visibilidad del mensaje
    if (message.classList.contains("d-none")) {
        message.classList.remove("d-none"); // Mostrar el mensaje
        toggleButton.textContent = "Ocultar Mensaje"; // Cambiar texto del botón
    } else {
        message.classList.add("d-none"); // Ocultar el mensaje
        toggleButton.textContent = "Descubrir Mensaje"; // Restaurar texto original
    }
}

// Mostrar saludo personalizado en home.html
if (window.location.pathname.includes("home.html")) {
    window.addEventListener("DOMContentLoaded", () => {
        const username = localStorage.getItem("username"); // Recuperar el nombre del usuario
        if (username) {
            const welcomeMessage = document.querySelector("#welcome h1"); // Seleccionar el h1
            if (welcomeMessage) {
                welcomeMessage.textContent = `Bienvenida, ${username} 💕`; // Cambiar el texto
            } else {
                console.error("El elemento del saludo no se encontró.");
            }
        } else {
            console.error("No se encontró un nombre de usuario en localStorage.");
        }
    });
}



const volumeControl = document.getElementById("volume-control");
if (volumeControl) {
    volumeControl.addEventListener("input", function (e) {
        const volume = e.target.value; // Obtén el valor del deslizador
        if (controlMusic.audioInstance) {
            controlMusic.audioInstance.volume = volume; // Ajusta el volumen
            console.log("Volumen ajustado a:", volume);
        }
    });
} else {
    console.log("El control de volumen no está presente en esta página.");
}

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
document.addEventListener("DOMContentLoaded", () => {
    const welcomeTitle = document.getElementById("welcome-title");
    typeWriterEffect(welcomeTitle, "Disfrutalo cuantas veces quieras. Es un espacio en donde te puedes sentir segura con todas tus emociones de nina.", 100);
});


// Mostrar imagen y nombre en el navbar
window.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        const navbarUsername = document.getElementById("navbar-username");
        navbarUsername.textContent = username; // Mostrar el nombre del usuario
    }
});