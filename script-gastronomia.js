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

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".expanding-cards .card");

    cards.forEach(card => {
        // 🖱 Para PC: Expandir al pasar el mouse y redirigir al hacer click
        card.addEventListener("mouseover", () => {
            if (window.innerWidth > 768) { // Solo en PC
                document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
                card.classList.add("active");
            }
        });

        card.addEventListener("click", function(event) {
            event.preventDefault(); // Evita comportamiento por defecto

            const link = this.getAttribute("href");
            if (!link || link === "#") return; // Previene errores si href está vacío

            if (window.innerWidth <= 768) { // 📱 MÓVILES: Redirigir de inmediato
                console.log("📌 Redirigiendo en móvil a:", link);
                window.location.href = link;
            } else { // 💻 PC: Expandir primero, luego redirigir al hacer click
                document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
                card.classList.add("active");

                // 🕐 Redirigir después de 0.5s (solo en PC)
                setTimeout(() => {
                    console.log("📌 Redirigiendo en PC a:", link);
                    window.location.href = link;
                }, 500);
            }
        });

        // 📱 Solución para el problema de scroll en móviles
        card.addEventListener("touchstart", function(event) {
            event.preventDefault(); // Evita problemas de scroll en móviles
            console.log("📌 Touch detectado en móvil:", this.getAttribute("href"));
            this.click(); // Simula el click normal
        }, { passive: false });
    });
});
