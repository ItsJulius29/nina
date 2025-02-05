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

function openModal(item) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalVideo = document.getElementById("modal-video");
    const modalDesc = document.getElementById("modal-text");
    const modalLikes = document.getElementById("modal-likes");
    const modalTiempo = document.getElementById("modal-tiempo");
    const modalComments = document.getElementById("modal-comments");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    modal.classList.remove("hidden"); // Mostrar el modal
    modalDesc.textContent = item.dataset.desc; // Descripción de la imagen

    // Obtener likes,tiempo y comentarios
    const likes = item.dataset.likes || 0;
    const tiempo = item.dataset.tiempo || 0;
    const comments = item.dataset.comments || 0;

    // Mostrar los likes y comentarios en el modal
    modalLikes.textContent = `${likes} likes`;
    modalTiempo.textContent = `Hace ${tiempo}`;
    modalComments.textContent = `${comments} comentarios`;

    // Si es una imagen
    if (item.dataset.type === "image") {
        const images = JSON.parse(item.dataset.images || "[]");

        if (images.length > 1) {
            modalImage.src = images[0]; // Asignar la primera imagen
            modalImage.classList.remove("hidden");
            modalVideo.classList.add("hidden");

            prevBtn.style.display = "block";
            nextBtn.style.display = "block";

            let currentIndex = 0;

            // Actualizar imagen al hacer clic en las flechas
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
                modalImage.src = images[currentIndex];
            });

            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
                modalImage.src = images[currentIndex];
            });
        } else {
            modalImage.src = item.dataset.src; // Asignar src a la imagen
            modalImage.classList.remove("hidden");
            modalVideo.classList.add("hidden");
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
    } else if (item.dataset.type === "video") {
        // Si es un video
        modalVideo.src = item.dataset.src;
        modalVideo.classList.remove("hidden");
        modalImage.classList.add("hidden");
        modalVideo.play(); // Reproducir el video automáticamente cuando se abre
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
}


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

// Mostrar el modal al hacer clic en cualquier item de la galería
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos la galería de fotos y la de reels
    const photoGallery = document.getElementById("photos");
    const reelGallery = document.getElementById("reels");

    // Al hacer clic en cualquier item de la galería de fotos o reels, abrir el modal
    photoGallery.addEventListener("click", (event) => {
        const item = event.target.closest(".gallery-item");
        if (!item) return;
        openModal(item);
    });

    reelGallery.addEventListener("click", (event) => {
        const item = event.target.closest(".gallery-item");
        if (!item) return;
        openModal(item);
    });

    // Cerrar el modal al hacer clic en la "X"
    document.querySelector(".close").addEventListener("click", () => {
        const modal = document.getElementById("image-modal");
        modal.classList.add("hidden");

        // Pausar el video cuando se cierre el modal
        const modalVideo = document.getElementById("modal-video");
        modalVideo.pause(); // Pausar el video
        modalVideo.currentTime = 0; // Reiniciar el video
    });

    // Cerrar el modal al hacer clic fuera del contenido
    document.getElementById("image-modal").addEventListener("click", (event) => {
        const modal = document.getElementById("image-modal");
        if (event.target === modal) {
            modal.classList.add("hidden");

            // Pausar el video cuando se cierre el modal
            const modalVideo = document.getElementById("modal-video");
            modalVideo.pause(); // Pausar el video
            modalVideo.currentTime = 0; // Reiniciar el video
        }
    });
});

// Lógica para las flechas de navegación
document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    prevBtn.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = images.length - 1;
        updateModalImage();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= images.length) currentIndex = 0;
        updateModalImage();
    });

    function updateModalImage() {
        const modalImage = document.getElementById("modal-image");
        const modalVideo = document.getElementById("modal-video");
        if (images[currentIndex].type === "image") {
            modalImage.src = images[currentIndex].src;
            modalVideo.classList.add("hidden");
            modalImage.classList.remove("hidden");
        } else {
            modalVideo.src = images[currentIndex].src;
            modalImage.classList.add("hidden");
            modalVideo.classList.remove("hidden");
        }
    }
});
