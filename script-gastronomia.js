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
        card.addEventListener("click", function(event) {
            event.preventDefault(); // Evita comportamiento predeterminado en enlaces
            
            const link = this.getAttribute("href");
            if (!link || link === "#") return; // Evita errores si el href está vacío

            if (window.innerWidth <= 768) { 
                // 📱 En móviles: Redirigir directamente
                console.log("📌 Redirigiendo en móvil a:", link);
                if (link.startsWith("#")) {
                    const targetElement = document.querySelector(link);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                } else {
                    window.location.href = link;
                }
            } else { 
                // 💻 En PC: Expandir y redirigir después de 0.5s
                document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
                card.classList.add("active");

                setTimeout(() => {
                    console.log("📌 Redirigiendo en PC a:", link);
                    if (link.startsWith("#")) {
                        const targetElement = document.querySelector(link);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    } else {
                        window.location.href = link;
                    }
                }, 500);
            }
        });

        // ✅ Eliminamos preventDefault en touchstart para no bloquear el desplazamiento
        card.addEventListener("touchstart", function() {
            console.log("📌 Touch detectado en móvil:", this.getAttribute("href"));
        }, { passive: true });
    });
});


