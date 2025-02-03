import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const auth = getAuth();

// ✅ Autenticación y actualización de perfil
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.replace("login.html");
        return;
    }

    const username = user.email.split("@")[0];
    document.getElementById("navbar-username").textContent = username;
    document.getElementById("perfil-username").textContent = `@${username}`;
    document.getElementById("nombre-usuario").textContent = username;
    document.getElementById("correo-usuario").textContent = user.email;
});

// ✅ Cerrar sesión
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            signOut(auth).then(() => {
                localStorage.removeItem("username");
                window.location.href = "login.html";
            }).catch(error => console.error("Error al cerrar sesión:", error));
        });
    }
});

// ✅ Manejo de pestañas (Fotos y Reels) - Delegación de eventos
document.addEventListener("DOMContentLoaded", () => {
    const tabContainer = document.querySelector(".tab-container");
    const contents = document.querySelectorAll(".gallery-grid");

    tabContainer.addEventListener("click", (event) => {
        const tab = event.target.closest(".tab");

        if (!tab) return; // Si no es una pestaña, salir

        // Cambiar la clase active de las pestañas
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Ocultar todas las galerías
        contents.forEach(content => content.classList.add("hidden"));

        // Mostrar la galería correspondiente
        document.getElementById(tab.dataset.tab).classList.remove("hidden");
    });
});

// Función para abrir el modal
function openModal(item) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalVideo = document.getElementById("modal-video");
    const modalDesc = document.getElementById("modal-text");

    modal.classList.remove("hidden"); // Mostrar el modal
    modalDesc.textContent = item.dataset.desc; // Descripción de la imagen

    // Si es una imagen
    if (item.dataset.type === "image") {
        modalImage.src = item.dataset.src; // Asignar src a la imagen
        modalImage.classList.remove("hidden");
        modalVideo.classList.add("hidden"); // Ocultar el video
    } else {
        // Si es un video
        modalVideo.src = item.dataset.src;
        modalVideo.classList.remove("hidden");
        modalImage.classList.add("hidden"); // Ocultar la imagen
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Asegurémonos de que la galería esté bien seleccionada
    const gallery = document.querySelector(".gallery-grid");
    
    if (!gallery) {
        console.log("Galería no encontrada");
        return;
    }

    gallery.addEventListener("click", (event) => {
        const item = event.target.closest(".gallery-item");
        
        // Si el clic no es en un item, salir
        if (!item) return;

        // Abrir el modal con el item seleccionado
        openModal(item);
    });

    // Cerrar el modal al hacer clic en la "X"
    document.querySelector(".close").addEventListener("click", () => {
        document.getElementById("image-modal").classList.add("hidden");
    });

    // Cerrar el modal al hacer clic fuera del contenido
    document.getElementById("image-modal").addEventListener("click", (event) => {
        const modal = document.getElementById("image-modal");
        if (event.target === modal) {
            modal.classList.add("hidden"); // Cerrar el modal si se hace clic fuera
        }
    });
});
