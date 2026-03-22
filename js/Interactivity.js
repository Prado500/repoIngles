document.addEventListener("DOMContentLoaded", function () {

    // Efecto interactivo para las imágenes (Sin zoom, solo iluminación y sombra dinámica)
    const images = document.querySelectorAll(".clinic img, .service img");

    images.forEach(img => {
        img.addEventListener("mouseover", function () {
            // Se le aplica un filtro de brillo y una sombra pronunciada
            this.style.filter = "brightness(1.1)";
            this.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.3)";
            this.style.borderColor = "#3498db"; // Borde azul claro
        });

        img.addEventListener("mouseleave", function () {
            // Vuelve a su estado original
            this.style.filter = "brightness(1)";
            this.style.boxShadow = "none";
            this.style.borderColor = "#ecf0f1";
        });
    });

    // Efecto interactivo opcional para las tarjetas completas
    const cards = document.querySelectorAll(".card, .clinic");

    cards.forEach(card => {
        card.addEventListener("mouseover", function () {
            this.style.transform = "translateY(-5px)";
            this.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });

    console.log("Interactivity.js cargado: Botones y hover de imágenes activos.");
});