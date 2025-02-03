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

// ✅ Expanding Cards - Diferente comportamiento en PC y móviles
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".expanding-cards .card");

    function handleClick(event) {
        const card = event.currentTarget;
        const link = card.getAttribute("href");

        if (!link || link === "#") return; // Previene errores si el href está vacío

        if (window.innerWidth <= 768) { 
            // 📱 MÓVILES: Redirige directo sin expandir
            console.log("📌 Redirigiendo a:", link);
            window.location.href = link;
        } else { 
            // 💻 PC: Expande y luego redirige
            event.preventDefault();
            document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            setTimeout(() => {
                window.location.href = link;
            }, 500); // Pequeño delay para que se note la expansión
        }
    }

    // 🚀 Aplica eventos a todas las tarjetas
    cards.forEach(card => {
        if (window.innerWidth > 768) {
            card.addEventListener("mouseover", () => {
                document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
                card.classList.add("active");
            });
        }

        // 📌 Evita que se expanda en móviles
        card.addEventListener("click", handleClick);
        card.addEventListener("touchstart", handleClick, { passive: true });
    });

    // ✅ Asegura que en móviles NO se expandan las imágenes, solo redirijan
    if (window.innerWidth <= 768) {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("active");
        });
    }
});
