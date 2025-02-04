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

let currentPage = 0; // Página inicial
const pages = document.querySelectorAll('.history-page'); // Todas las páginas
const nextBtn = document.getElementById('next-button');
const prevBtn = document.getElementById('prev-button');

// Mostrar la primera página
pages[currentPage].classList.add('active');

// Función de desplazamiento suave para móviles y PCs
function scrollToPage(pageIndex) {
    pages[pageIndex].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' // Centra el elemento en la pantalla
    });
}

// Cambiar a la siguiente página
nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove('active');
        currentPage++;
        pages[currentPage].classList.add('active');
        scrollToPage(currentPage); // Llamada a la función para hacer scroll al div actual
    }
});

// Cambiar a la página anterior
prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        pages[currentPage].classList.remove('active');
        currentPage--;
        pages[currentPage].classList.add('active');
        scrollToPage(currentPage); // Llamada a la función para hacer scroll al div actual
    }
});

// Detectar si es móvil
const isMobile = window.innerWidth <= 768;

// Si es móvil, redirigir al centro del div activo al hacer clic en los botones
if (isMobile) {
    nextBtn.addEventListener('click', () => {
        scrollToPage(currentPage);
    });

    prevBtn.addEventListener('click', () => {
        scrollToPage(currentPage);
    });
}
