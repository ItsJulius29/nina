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

// ✅ Diferente comportamiento para PC y Móvil
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".expanding-cards .card");

    function handleMobileClick(event) {
        event.preventDefault(); // Previene que la página haga scroll por error
        const link = event.currentTarget.getAttribute("href");
        if (link && link !== "#") {
            console.log("📌 Redirigiendo en móvil a:", link);
            window.location.href = link;
        }
    }

    function handleDesktopClick(event) {
        event.preventDefault(); // Evita la navegación inmediata en PC
        const card = event.currentTarget;
        const link = card.getAttribute("href");

        if (!link || link === "#") return;

        document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        // Redirige después de un pequeño delay (500ms)
        setTimeout(() => {
            console.log("📌 Redirigiendo en PC a:", link);
            window.location.href = link;
        }, 500);
    }

    function applyEventListeners() {
        const isMobile = window.innerWidth <= 768;

        cards.forEach(card => {
            card.removeEventListener("click", handleMobileClick);
            card.removeEventListener("click", handleDesktopClick);

            if (isMobile) {
                card.addEventListener("click", handleMobileClick);
            } else {
                card.addEventListener("mouseover", () => {
                    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
                    card.classList.add("active");
                });
                card.addEventListener("click", handleDesktopClick);
            }
        });
    }

    // Aplica los eventos iniciales
    applyEventListeners();

    // Vuelve a aplicar eventos si cambia el tamaño de pantalla
    window.addEventListener("resize", applyEventListeners);
});
