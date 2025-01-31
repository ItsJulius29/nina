document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username") || "Invitado";
    document.getElementById("perfil-username").textContent = `@${username}`;
    document.getElementById("nombre-usuario").textContent = username;

});
