

document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Cargar usuarios desde JSON
    try {
        const response = await fetch("users.json");
        if (!response.ok) throw new Error("No se pudo cargar el archivo JSON.");
        const users = await response.json();

        const user = users.find(user => user.username === username && user.password === password);

        const messageDiv = document.getElementById("message");
        if (user) {
            messageDiv.textContent = "Login exitoso. Redirigiendo...";
            messageDiv.style.color = "green";
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
