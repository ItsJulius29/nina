import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Inicializar Firebase Auth
const auth = getAuth();

// Validar autenticación al cargar la página
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // 🔴 Si NO hay usuario autenticado, redirigir al login
        window.location.replace("login.html");
    } else {
        // ✅ Si el usuario está autenticado, mostrar su nombre o email en la navbar y en el saludo
        const navbarUsername = document.getElementById("navbar-username");
        const welcomeMessage = document.querySelector("#welcome h1");

        if (navbarUsername) {
            navbarUsername.textContent = user.displayName || user.email.split("@")[0]; // Si hay displayName lo usa, sino solo el nombre del email
        }

        if (welcomeMessage) {
            welcomeMessage.textContent = `Bienvenida, ${user.displayName || user.email.split("@")[0]} 💕`;
        }
    }
});


// Efecto de escritura en el mensaje de bienvenida
function typeWriterEffect(element, text, delay = 100) {
    if (!element) {
        console.error("El elemento proporcionado no existe.");
        return;
    }

    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval); // Detén la animación
        }
    }, delay);
}

// Aplicar efecto de escritura en el mensaje de bienvenida
document.addEventListener("DOMContentLoaded", () => {
    const welcomeTitle = document.getElementById("welcome-title");
    typeWriterEffect(welcomeTitle, "Disfrútalo esta página web cuantas veces quieras. Es un espacio en donde te puedes sentir segura con todas tus emociones de niña.", 100);
});

// Cerrar sesión cuando el usuario presione el botón "Cerrar Sesión"
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            signOut(auth).then(() => {
                localStorage.removeItem("user"); // Eliminar usuario guardado
                window.location.href = "login.html"; // Redirigir al login al cerrar sesión
            }).catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
        });
    }
});

