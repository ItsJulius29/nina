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
    let lastClickedCard = null; // Guarda el último card tocado en móvil

    // Función de redirección
    function redirectToSection(card) {
        const link = card.getAttribute("href");
        if (link && link !== "#") {
            console.log("📌 Redirigiendo a:", link);
            window.location.href = link; // Redirige a la sección
        }
    }

    // Manejo de eventos en PC
    function handleHover(event) {
        if (window.innerWidth > 768) { // 💻 En PC
            document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
            event.currentTarget.classList.add("active");
        }
    }

    function handleClick(event) {
        const card = event.currentTarget;
        const link = card.getAttribute("href");

        if (!link || link === "#") return; // Previene errores si el href está vacío

        if (window.innerWidth <= 768) { // 📱 En móviles
            event.preventDefault();

            if (lastClickedCard === card) {
                redirectToSection(card); // 🔗 Redirige en el segundo clic
            } else {
                lastClickedCard = card; // Guarda la referencia del primer clic
                document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
                card.classList.add("active"); // Expande la imagen en el primer clic
            }

        } else { // 💻 En PC
            event.preventDefault(); // Evita la redirección automática
            redirectToSection(card); // Redirige inmediatamente en PC
        }
    }

    // Aplica los eventos a todas las tarjetas
    cards.forEach(card => {
        card.addEventListener("mouseover", handleHover); // Expansión al pasar el mouse en PC
        card.addEventListener("click", handleClick);
    });
});
