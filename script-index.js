// Botón "No" que se mueve al pasar el ratón
const noButton = document.getElementById("no-button");

noButton.addEventListener("mouseover", () => {
    const x = Math.random() * window.innerWidth * 0.8;
    const y = Math.random() * window.innerHeight * 0.8;
    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

// Redirección al hacer clic en "Sí"
const yesButton = document.getElementById("yes-button");

yesButton.addEventListener("click", () => {
    window.location.href = "login.html";
});
