import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Inicializar Firebase Auth
const auth = getAuth();

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        const navbarUsername = document.getElementById("navbar-username");
        if (navbarUsername) {
            navbarUsername.textContent = user.email.split("@")[0]; // Mostrar el nombre antes del @
        }
        localStorage.setItem("username", user.email.split("@")[0]); 
    } else {
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

// Asignar evento al botón de cerrar sesión
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", cerrarSesion);
    }
});

// Mostrar el tiempo que llevan juntos
document.addEventListener("DOMContentLoaded", () => {
    const startDate = new Date("2023-10-20");
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const daysCounter = document.getElementById("days-counter");
    if (daysCounter) {
        daysCounter.textContent = `❤️ Llevamos ${diffDays} días juntos ❤️`;
    }
});

let currentPage = 0;
const pages = document.querySelectorAll('.history-page');
const nextBtn = document.getElementById('next-button');
const prevBtn = document.getElementById('prev-button');

// Mostrar la primera página
pages[currentPage].classList.add('active');

// Función para hacer scroll
function scrollToPage(pageIndex) {
    const page = pages[pageIndex];
    window.requestAnimationFrame(() => {
        page.scrollIntoView({
            behavior: 'auto',
            block: 'center' // Aseguramos que el div esté centrado
        });
    });
}

// Cambiar a la siguiente página
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove('active');
        currentPage++;
        pages[currentPage].classList.add('active');
        setTimeout(() => {
            scrollToPage(currentPage); // Hacer scroll después de la animación
        }, 100); // Retraso para asegurar que el cambio de clase sea ejecutado correctamente
    }
});

// Cambiar a la página anterior
prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 0) {
        pages[currentPage].classList.remove('active');
        currentPage--;
        pages[currentPage].classList.add('active');
        setTimeout(() => {
            scrollToPage(currentPage); // Hacer scroll después de la animación
        }, 100); // Retraso para asegurar que el cambio de clase sea ejecutado correctamente
    }
});

// Agregar evento de clic a cada página
pages.forEach((page, index) => {
    page.addEventListener('click', () => {
        if (currentPage !== index) {
            pages[currentPage].classList.remove('active');
            currentPage = index;
            pages[currentPage].classList.add('active');
            scrollToPage(currentPage); // Hacer scroll al div actual
        }
    });
});
