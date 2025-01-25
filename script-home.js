
// Mostrar saludo personalizado en home.html
if (window.location.pathname.includes("home.html")) {
    window.addEventListener("DOMContentLoaded", () => {
        const username = localStorage.getItem("username"); // Recuperar el nombre del usuario
        if (username) {
            const welcomeMessage = document.querySelector("#welcome h1"); // Seleccionar el h1
            if (welcomeMessage) {
                welcomeMessage.textContent = `Bienvenida, ${username} 💕`; // Cambiar el texto
            } else {
                console.error("El elemento del saludo no se encontró.");
            }
        } else {
            console.error("No se encontró un nombre de usuario en localStorage.");
        }
    });
}


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

document.addEventListener("DOMContentLoaded", () => {
    const welcomeTitle = document.getElementById("welcome-title");
    typeWriterEffect(welcomeTitle, "Disfrutalo cuantas veces quieras. Es un espacio en donde te puedes sentir segura con todas tus emociones de nina.", 100);
});


// Mostrar imagen y nombre en el navbar
window.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        const navbarUsername = document.getElementById("navbar-username");
        navbarUsername.textContent = username; // Mostrar el nombre del usuario
    }
});
