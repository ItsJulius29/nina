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
        const link = card.getAttribute("href");
        if (!link || link === "#") return;

        if (window.innerWidth <= 768) {
            // 📱 En móviles: Deshabilitar expansión y solo redireccionar
            card.classList.remove("active"); // Asegura que no tenga la clase activa
            card.addEventListener("click", () => {
                console.log("📌 Redirigiendo en móvil a:", link);
                if (link.startsWith("#")) {
                    const targetElement = document.querySelector(link);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                } else {
                    window.location.href = link;
                }
            });
        } else {
            // 💻 En PC: Expande primero, luego redirige
            card.addEventListener("mouseover", function() {
                document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
                this.classList.add("active");
            });

            card.addEventListener("click", function(event) {
                event.preventDefault(); // Evita el comportamiento predeterminado de los enlaces
                console.log("📌 Redirigiendo en PC a:", link);
                setTimeout(() => {
                    if (link.startsWith("#")) {
                        const targetElement = document.querySelector(link);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    } else {
                        window.location.href = link;
                    }
                }, 500);
            });
        }
    });
});
