// script.js actualizado con saludo personalizado y mejoras
// Verifica si estamos en index.html y el formulario existe
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("users.json");
            if (!response.ok) throw new Error("No se pudo cargar el archivo JSON.");
            const users = await response.json();

            const user = users.find(user => user.username === username && user.password === password);

            const messageDiv = document.getElementById("message");
            if (user) {
                messageDiv.textContent = "Login exitoso. Redirigiendo...";
                messageDiv.style.color = "green";

                // Guardar el nombre del usuario en localStorage
                localStorage.setItem("username", username);

                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1000);
            } else {
                messageDiv.textContent = "Usuario o contraseña incorrectos. Inténtalo de nuevo.";
                messageDiv.style.color = "red";
            }
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
            document.getElementById("message").textContent = "Error al cargar usuarios.";
        }
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
