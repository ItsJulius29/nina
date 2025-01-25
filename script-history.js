document.addEventListener("DOMContentLoaded", () => {
    const startDate = new Date("2023-10-20"); // Fecha personalizada
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById("days-counter").textContent = `❤️ Llevamos ${diffDays} días juntos ❤️`;
});
