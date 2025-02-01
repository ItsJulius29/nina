// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJvaodFJfG2HBYfZXZpAuHgClaJx94E-w",
    authDomain: "nina-76797.firebaseapp.com",
    projectId: "nina-76797",
    storageBucket: "nina-76797.firebasestorage.app",
    messagingSenderId: "561663225891",
    appId: "1:561663225891:web:8cf2b120cdb349e084c196",
    measurementId: "G-DNMCC4N3KX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Capturar el formulario de login
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Autenticación con Firebase
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                document.getElementById("message").textContent = "Login exitoso. Redirigiendo...";
                document.getElementById("message").style.color = "green";

                // Guardar el usuario en localStorage
                localStorage.setItem("user", JSON.stringify(user));

                // Redirigir a home.html
                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1000);
            })
            .catch((error) => {
                document.getElementById("message").textContent = "Error: " + error.message;
                document.getElementById("message").style.color = "red";
            });
    });
}


// Verificar si el usuario está autenticado al cargar la página
onAuthStateChanged(auth, (user) => {
    if (!user && window.location.pathname !== "/login.html") {
        window.location.href = "login.html"; // Redirigir al login si no está autenticado
    }
});

// Cerrar sesión al presionar el botón "Cerrar Sesión"
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        signOut(auth).then(() => {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
    });
}

//contador cuenta atras 14 de feb
// Contador en reversa hasta el 14 de febrero
const countdownElement = document.getElementById("countdown");

if (countdownElement) {
    const targetDate = new Date("2025-02-14T00:00:00").getTime();

    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = ` ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`;

        if (distance < 0) {
            clearInterval(countdown);
            countdownElement.innerHTML = "¡Es 14 de Febrero! Puedes iniciar sesión.";
            document.getElementById("username").disabled = false;
            document.getElementById("password").disabled = false;
            document.querySelector("button[type='submit']").disabled = false;
        }
    }, 1000);
}



