const noButton = document.getElementById("no-button");

function moveNoButton() {
    const maxWidth = window.innerWidth - noButton.clientWidth - 20;
    const maxHeight = window.innerHeight - noButton.clientHeight - 20;

    const x = Math.random() * maxWidth;
    const y = Math.random() * maxHeight;

    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
}

// Detectar si es un dispositivo táctil
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

// Para PC (hover)
if (!isTouchDevice) {
    noButton.addEventListener("mouseover", moveNoButton);
} else {
    // Para móviles (toque o clic)
    noButton.addEventListener("click", moveNoButton);
}

// ✅ Redirección con animación fluida en "Sí"
const yesButton = document.getElementById("yes-button");
if (yesButton) {
    yesButton.addEventListener("click", () => {
        launchConfetti();
        redirectWithFade("login.html");
    });
}

// 🎊 Confeti cuando se presiona "Sí"
function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// 🚀 Transición fluida al redirigir
function redirectWithFade(url) {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = url;
    }, 1500); // Se ajustó el tiempo para mejor UX
}

// ✨ Animación tipo máquina de escribir RESPONSIVA
document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.getElementById("animated-title");
    if (titleElement) {
        typeWriterEffect(titleElement, "¿Quieres ser mi San Valentín? 💖", 100);
    } else {
        console.error("El elemento con id 'animated-title' no existe.");
    }
});

// ✅ Mejor efecto de escritura que ajusta el tamaño según la pantalla
function typeWriterEffect(element, text, delay = 100) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = ""; // Limpiar antes de escribir
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, delay);
}

// 🐸 Sapo reproduce música y no se sale en móviles
document.addEventListener("DOMContentLoaded", () => {
    const sapo = document.getElementById("sapo");
    const audio = document.getElementById("background-music");

    if (sapo && audio) {
        sapo.addEventListener("click", () => {
            audio.currentTime = 0;
            audio.play().catch(error => console.error("No se pudo reproducir el audio:", error));
        });

        // Evita que el sapo se salga de los límites
        sapo.addEventListener("click", () => {
            const maxWidth = window.innerWidth - sapo.clientWidth - 10;
            const maxHeight = window.innerHeight - sapo.clientHeight - 10;

            const x = Math.random() * maxWidth;
            const y = Math.random() * maxHeight;

            sapo.style.position = "absolute";
            sapo.style.left = `${x}px`;
            sapo.style.top = `${y}px`;
        });
    } else {
        console.error("No se encontró el sapo o el audio en la página.");
    }
});

// 🏆 Mensaje emergente al hacer clic en "Sí"
document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("yes-button");
    const customAlert = document.getElementById("custom-alert");

    if (yesButton && customAlert) {
        yesButton.addEventListener("click", () => {
            customAlert.classList.remove("hidden");

            setTimeout(() => {
                customAlert.classList.add("hidden");
                window.location.href = "login.html";
            }, 2000);
        });
    } else {
        console.error("No se encontró el botón 'Sí' o el contenedor del modal.");
    }
});

