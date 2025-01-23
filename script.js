// script.js actualizado con saludo personalizado y mejoras
// Verifica si estamos en index.html y el formulario existe
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("users.json");
            if (!response.ok) throw new Error("No se pudo cargar el archivo JSON.");
            const users = await response.json();

            const user = users.find(user => user.username === username && user.password === password);

            const messageDiv = document.getElementById("message");
            if (user) {
                messageDiv.textContent = "Login exitoso. Redirigiendo...";
                messageDiv.style.color = "green";

                // Guardar el nombre del usuario en localStorage
                localStorage.setItem("username", username);

                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1000);
            } else {
                messageDiv.textContent = "Usuario o contraseña incorrectos. Inténtalo de nuevo.";
                messageDiv.style.color = "red";
            }
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
            document.getElementById("message").textContent = "Error al cargar usuarios.";
        }
    });
}


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

// Mostrar imagen y nombre en el navbar
window.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        const navbarUsername = document.getElementById("navbar-username");
        navbarUsername.textContent = username; // Mostrar el nombre del usuario
    }
});

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


//contador cuenta atras 14 de feb
// Contador en reversa hasta el 14 de febrero
const countdownElement = document.getElementById("countdown");

if (countdownElement) {
    const targetDate = new Date("2025-02-14T00:00:00").getTime();

    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = ` ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`;

        if (distance < 0) {
            clearInterval(countdown);
            countdownElement.innerHTML = "¡Es 14 de Febrero! Puedes iniciar sesión.";
            document.getElementById("username").disabled = false;
            document.getElementById("password").disabled = false;
            document.querySelector("button[type='submit']").disabled = false;
        }
    }, 1000);
}
