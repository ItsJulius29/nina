import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Inicializar Firebase Auth
const auth = getAuth();

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si el usuario está autenticado, actualizar el navbar con su nombre
        const navbarUsername = document.getElementById("navbar-username");
        if (navbarUsername) {
            navbarUsername.textContent = user.email.split("@")[0]; // Mostrar el nombre antes del @
        }
        localStorage.setItem("username", user.email.split("@")[0]); // Guardar en localStorage
    } else {
        // Si NO hay usuario autenticado, redirigir al login
        window.location.replace("login.html");
    }
});

// Función para cerrar sesión
function cerrarSesion() {
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        window.location.href = "login.html"; // Redirigir al login
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
}

// Asignar evento al botón de cerrar sesión en cualquier página
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", cerrarSesion);
    }
});

// Mostrar el tiempo que llevan juntos
document.addEventListener("DOMContentLoaded", () => {
    const startDate = new Date("2023-10-20"); // Fecha personalizada
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const daysCounter = document.getElementById("days-counter");
    if (daysCounter) {
        daysCounter.textContent = `❤️ Llevamos ${diffDays} días juntos ❤️`;
    }
});
