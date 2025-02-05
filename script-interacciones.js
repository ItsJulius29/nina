import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const auth = getAuth();

// Verifica si el usuario está autenticado antes de cargar la página
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Si no está autenticado, redirigir a login
        window.location.href = "login.html";
    } else {
        // Mostrar el nombre del usuario en el navbar
        const navbarUsername = document.getElementById("navbar-username");
        if (navbarUsername) {
            navbarUsername.textContent = user.email.split("@")[0]; // Muestra el nombre antes del @ del correo
        }
    }
});

// Cerrar sesión al hacer clic en el botón
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = "login.html";
            }).catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
        });
    }
});


// Agregar evento si el botón existe
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-button");
    if (toggleButton) {
        toggleButton.addEventListener("click", cambiarMensaje);
    }
});
function cambiarMensaje() {
    const message = document.getElementById("hidden-message");
    const toggleButton = document.getElementById("toggle-button");

    if (message.classList.contains("d-none")) {
        message.classList.remove("d-none");
        toggleButton.textContent = "Ocultar Mensaje";
    } else {
        message.classList.add("d-none");
        toggleButton.textContent = "Descubrir Mensaje";
    }
}

// Crear la instancia global de audio
const audio = new Audio("music/music1.mp3");
audio.volume = 0.5; // Volumen inicial

// Control de reproducción de música
window.controlMusic = function (action) {
    switch (action) {
        case "play":
            if (audio.paused || audio.ended) {
                audio.play().then(() => {
                    console.log("Música reproduciéndose");
                }).catch(error => {
                    console.error("Error al reproducir música:", error);
                });
            }
            break;

        case "pause":
            audio.pause();
            console.log("Música pausada");
            break;

        case "stop":
            audio.pause();
            audio.currentTime = 0; // Reiniciar al principio
            console.log("Música detenida");
            break;

        default:
            console.log("Acción no válida. Usa 'play', 'pause' o 'stop'.");
    }
};

// Control del volumen
document.addEventListener("DOMContentLoaded", () => {
    const volumeControl = document.getElementById("volume-control");
    if (volumeControl) {
        volumeControl.addEventListener("input", function (e) {
            const volume = e.target.value;
            audio.volume = volume;
            console.log("Volumen ajustado a:", volume);
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const heart = document.getElementById("heart");
    const scoreElement = document.getElementById("score");
    const gameArea = document.getElementById("game-area");

    let score = 0;

    // Verifica si los elementos existen
    if (!heart || !scoreElement || !gameArea) {
        console.error("Faltan elementos del juego.");
        return;
    }

    // Función para mover el corazón a una posición aleatoria
    function moveHeart() {
        const areaWidth = gameArea.clientWidth;
        const areaHeight = gameArea.clientHeight;

        const newX = Math.random() * (areaWidth - heart.offsetWidth);
        const newY = Math.random() * (areaHeight - heart.offsetHeight);

        heart.style.left = `${newX}px`;
        heart.style.top = `${newY}px`;
    }

    // Incrementar puntaje al hacer clic en el corazón
    heart.addEventListener("click", () => {
        score++;
        scoreElement.textContent = `Puntos: ${score}`;
        moveHeart(); // Mueve el corazón
    });

    // Inicializa la posición del corazón
    moveHeart();
});


//puzzle arrastrar
document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById("puzzle-container");
    const dropZone = document.getElementById("drop-zone");

    const imageURL = "img/galery/galery20.jpg"; // Cambia esto por la ruta de tu imagen
    const gridSize = 3; // Puzzle 3x3
    const totalPieces = gridSize * gridSize;

    let isSolved = false;

    // Crear las piezas del puzzle
    const pieces = [];
    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.style.backgroundImage = `url(${imageURL})`;
        piece.style.backgroundPosition = `${
            -(i % gridSize) * 100
        }px ${-Math.floor(i / gridSize) * 100}px`;
        piece.draggable = true;
        piece.dataset.index = i; // Guardar el índice correcto
        pieces.push(piece);
    }

    // Mezclar las piezas
    pieces.sort(() => Math.random() - 0.5);

    // Agregar piezas mezcladas al contenedor inicial
    pieces.forEach((piece) => {
        puzzleContainer.appendChild(piece);
    });

    // Drag and Drop
    let draggedPiece = null;

    // Al iniciar el arrastre
    puzzleContainer.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("puzzle-piece")) {
            draggedPiece = e.target;
        }
    });

    dropZone.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("puzzle-piece")) {
            draggedPiece = e.target;
        }
    });

    // Permitir soltar
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    puzzleContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    // Al soltar en la zona de ensamblaje
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();

        if (draggedPiece) {
            const targetSlot = e.target;

            if (
                targetSlot.classList.contains("puzzle-slot") &&
                !targetSlot.hasChildNodes()
            ) {
                targetSlot.appendChild(draggedPiece);
            } else {
                alert("Por favor suelta la pieza en un lugar válido.");
            }

            draggedPiece = null;
        }

        checkPuzzleCompletion();
    });

    // Al soltar en la zona de piezas originales
    puzzleContainer.addEventListener("drop", (e) => {
        e.preventDefault();

        if (draggedPiece) {
            puzzleContainer.appendChild(draggedPiece);
            draggedPiece = null;
        }
    });

    // Verificar si todas las piezas están en la posición correcta
    function checkPuzzleCompletion() {
        const slots = Array.from(dropZone.children);
        const isCorrect = slots.every((slot, index) => {
            const piece = slot.firstChild;
            return piece && parseInt(piece.dataset.index) === index;
        });

        if (isCorrect && !isSolved) {
            alert("¡Felicidades! Completaste el puzzle 🎉");
            isSolved = true; // Evitar múltiples alertas
        }
    }

    // Inicializar la zona de ensamblaje con espacios vacíos
    for (let i = 0; i < totalPieces; i++) {
        const emptySlot = document.createElement("div");
        emptySlot.classList.add("puzzle-slot");
        emptySlot.dataset.index = i;
        dropZone.appendChild(emptySlot);
    }
});
