import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const auth = getAuth();

// Redirigir si no está autenticado
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html"; // Bloquea acceso a la página si no está logueado
    } else {
        // Mostrar nombre de usuario en el navbar
        const navbarUsername = document.getElementById("navbar-username");
        if (navbarUsername) {
            navbarUsername.textContent = user.email.split("@")[0]; // Mostrar solo el nombre antes del @
        }
    }
});

// Cerrar sesión
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "login.html"; // Redirige al login tras cerrar sesión
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
    });
}

// Inicializar el mapa
var map = L.map('map').setView([-12.097971, -77.068382], 13); // Coordenadas de Lima

// Agregar el tile layer (CartoDB Voyager)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Lugares especiales con popups personalizados
var lugares = [
    {
        coords: [-12.0599863, -77.1314227],
        title: "Cruce de miradas por primera vez",
        description: "El lugar donde comenzó nuestra primera aventura juntos.",
        image: "img/history/history1.jpg"
    },
    {
        coords: [  -12.0768298, -77.0824769241177],
        title: "Primer Beso🍽️",
        description: "Aquí tuvimos nuestra primer beso.",
        image: "img/history/history16.jpg"
    },
    {
        coords: [-12.11667, -77.05],
        title: "Un Día Inolvidable 🌅",
        description: "Un hermoso atardecer que nunca olvidaremos.",
        image: "img/history/history4.jpg"
    },
    {
        coords: [-12.129054, -77.035124],
        title: "Malecon - 21 de Sep",
        description: "Una hermosa tarde, salida por el 21 de septiembre y flores amarillas",
        image: "img/nina/21sep.webp"
    },
    {
        coords: [-12.148867, -77.023070],
        title: "Barranco - 20 de Oct",
        description: "Un dia que nunca se podrá olvidar, porque aqui es donde oficializamos nuestro amor siendo enamoraditos.",
        image: "img/history/history11.jpg"
    },
    {
        coords: [-12.060843, -77.036982],
        title: "Museo MALI",
        description: "Visita al museo como ninosh cultos.",
        image: "img/galery/galery7.jpg"
    },
    {
        coords: [-12.136622, -77.023056],
        title: "Exposición del Color",
        description: "Visita a la esposicion del color, ese mismo dia fuimos enamorados.",
        image: "img/galery/galery12.jpg"
    },
    {
        coords: [-12.070622, -77.033280],
        title: "Parque de las Aguas",
        description: "Paseito por el circuito mágico del agua.",
        image: "img/galery/galery14.jpg"
    },
    {
        coords: [-12.072640, -77.087048],
        title:"Parque de las leyendas",
        description: "Paseo al parque de las leyendas, ver monitos y dentro de un verano inolvidable",
        image: "img/history/history22.jpg"
    },
    {
        coords: [-12.073460, -77.166048],
        title: "La punta ",
        description: "Respiro en la punta, conectando con el mar",
        image: "img/nina/punta.JPG"
    },
    {
        coords: [-12.393834, -76.777289],
        title: "Playa San Bartolo",
        description: "Viaje a la playita con familia del monito",
        image: "img/history/history31.jpg"
    },
    {
        coords: [-12.0876959, -77.0548991],
        title: "Peruano Japones Exposicion",
        description: "Visita a otra exposicion en un verano lindo",
        image: "img/nina/perujapo.jpg"
    }
];

// Objeto para almacenar los marcadores
var markers = {};

// Crear un icono personalizado de color lila
var customLilaIcon = L.divIcon({
    className: 'custom-lila-icon', // Nombre de la clase
    html: '<div class="lila-circle"></div>', // HTML para el icono
    iconSize: [40, 40], // Tamaño del icono
    iconAnchor: [20, 40], // El ancla de donde se posiciona el icono
    popupAnchor: [0, -35], // Posición del popup
});

// Agregar los marcadores con el icono lila
lugares.forEach((lugar, index) => {
    var marker = L.marker(lugar.coords, {icon: customLilaIcon}).addTo(map); // Aplicar el nuevo icono lila

    // Popup personalizado con HTML
    var popupContent = `
        <div class="popup-content">
            <h4>${lugar.title}</h4>
            <img src="${lugar.image}" alt="${lugar.title}" class="popup-img">
            <p>${lugar.description}</p>
        </div>
    `;

    marker.bindPopup(popupContent);

    // Guardar el marcador en el objeto markers con el índice como clave
    markers[index] = marker;
});


// Seleccionar el contenedor de lugares
var lugaresContainer = document.getElementById("lugares-container");

lugares.forEach((lugar, index) => {
    var lugarCard = document.createElement("div");
    lugarCard.classList.add("col-md-4", "mb-4");

    lugarCard.innerHTML = `
        <div class="card lugar-card d-flex flex-row align-items-center" data-index="${index}">
            <img src="${lugar.image}" class="card-img" alt="${lugar.title}">
            <div class="card-body">
                <h5 class="card-title">${lugar.title}</h5>
                <p class="card-text">${lugar.description}</p>
            </div>
        </div>
    `;

    // Agregar evento de clic a cada tarjeta para seleccionar el marcador en el mapa
    lugarCard.addEventListener("click", function () {
        var marker = markers[index];
        if (marker) {
            map.setView(marker.getLatLng(), 15); // Hacer zoom en el marcador
            marker.openPopup(); // Abrir el popup del marcador

            // Desplazar suavemente la vista hacia el mapa
            document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Remover la clase 'selected' de todas las tarjetas
        document.querySelectorAll('.lugar-card').forEach(card => card.classList.remove('selected'));

        // Agregar la clase 'selected' a la tarjeta actual
        lugarCard.classList.add('selected');
    });

    lugaresContainer.appendChild(lugarCard);
});
