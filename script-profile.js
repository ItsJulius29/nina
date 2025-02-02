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

// Verificar si el usuario está autenticado nombre
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si el usuario está autenticado, actualizar el navbar con su nombre
        const navbarUsername = document.getElementById("nombre-usuario");
        if (navbarUsername) {
            navbarUsername.textContent = user.email.split("@")[0]; // Mostrar el nombre antes del @
        }
        localStorage.setItem("username",  user.email.split("@")[0]); // Guardar en localStorage
    } else {
        // Si NO hay usuario autenticado, redirigir al login
        window.location.replace("login.html");
    }
});

// Verificar si el usuario está autenticado correo
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si el usuario está autenticado, actualizar el navbar con su nombre
        const navbarUsername = document.getElementById("correo-usuario");
        if (navbarUsername) {
            navbarUsername.textContent = user.email; // Mostrar el nombre antes del @
        }
        localStorage.setItem("username", user.email); // Guardar en localStorage
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
