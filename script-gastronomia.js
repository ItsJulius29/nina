import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const auth = getAuth();

// Verifica si el usuario está autenticado antes de cargar la página
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        const navbarUsername = document.getElementById("navbar-username");
        if (navbarUsername) {
            navbarUsername.textContent = user.email.split("@")[0];
        }
    }
});

// Cerrar sesión
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = "login.html";
            }).catch((error) => console.error("Error al cerrar sesión:", error));
        });
    }
});

// Expanding Cards - Mejora de rendimiento
document.querySelectorAll('.expanding-cards').forEach(expandingCards => {
    expandingCards.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("card")) {
            document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
            event.target.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".expanding-cards .card");

    function handleClick(event) {
        const card = event.currentTarget;
        const link = card.getAttribute("href");

        if (!link || link === "#") return; // Previene errores si el href está vacío

        if (window.innerWidth <= 768) { // 📱 Dispositivos móviles
            console.log("Redirigiendo a:", link);
            window.location.href = link;
        } else { // 💻 PC - Expande la imagen
            event.preventDefault(); // Solo evita el comportamiento predeterminado en PC
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
        }
    }

    cards.forEach(card => {
        card.addEventListener("click", handleClick);
        card.addEventListener("touchstart", handleClick, { passive: true }); // 📌 Soporte para móviles
    });
});



