// Inicializar el mapa
var map = L.map('map').setView([-12.0464, -77.0428], 13); // Coordenadas de Lima

// Agregar el tile layer (CartoDB Voyager)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Lugares especiales con popups personalizados
var lugares = [
    {
        coords: [-12.0433, -77.0283],
        title: "Nuestro Primer Viaje ✈️",
        description: "El lugar donde comenzó nuestra primera aventura juntos.",
        image: "img/img3.jpg"
    },
    {
        coords: [-12.0564, -77.0372],
        title: "Cena Especial 🍽️",
        description: "Aquí tuvimos nuestra primera cena romántica.",
        image: "img/img1.webp"
    },
    {
        coords: [-12.0754, -77.0301],
        title: "Un Día Inolvidable 🌅",
        description: "Un hermoso atardecer que nunca olvidaremos.",
        image: "img/img2.webp"
    },
    {
        coords: [-12.09428725, -77.0043528785536],
        title: "Parque de las aguas",
        description: "Un hermoso día en el parque de las aguas.",
        image: "img/img2.webp"
    }
];

// Objeto para almacenar los marcadores
var markers = {};

// Agregar los marcadores al mapa y almacenarlos
lugares.forEach((lugar, index) => {
    var marker = L.marker(lugar.coords).addTo(map);

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
