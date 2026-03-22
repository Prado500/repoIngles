document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       EFECTOS HOVER DE IMÁGENES Y TARJETAS
    ================================================== */
    const images = document.querySelectorAll(".clinic img, .service img");
    images.forEach(img => {
        img.addEventListener("mouseover", function () {
            this.style.filter = "brightness(1.1)";
            this.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.3)";
            this.style.borderColor = "#3498db";
        });
        img.addEventListener("mouseleave", function () {
            this.style.filter = "brightness(1)";
            this.style.boxShadow = "none";
            this.style.borderColor = "#ecf0f1";
        });
    });

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

    /* ==================================================
       LÓGICA DEL SISTEMA DE PESTAÑAS (TABS)
    ================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const classContents = document.querySelectorAll('.class-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // 1. Quitar la clase 'active' de todos los botones y contenidos
            tabBtns.forEach(b => b.classList.remove('active'));
            classContents.forEach(c => c.classList.remove('active'));

            // 2. Añadir 'active' al botón clickeado y al contenido correspondiente
            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* ==================================================
       LÓGICA DEL MODAL DE GALERÍA (LIGHTBOX)
    ================================================== */
    const modal = document.getElementById("image-modal");
    const expandedImg = document.getElementById("expanded-img");
    const captionText = document.getElementById("caption");
    const closeModalBtn = document.querySelector(".close-modal");
    
    let currentGallery = []; // Arreglo para guardar las imágenes de la clase actual
    let currentIndex = 0;    // Índice de la imagen que se está viendo

    // Escuchar clics en todas las imágenes con la clase 'gallery-img'
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', function () {
            // Identificar qué clase está activa actualmente para agrupar solo sus imágenes
            const activeContent = document.querySelector('.class-content.active');
            currentGallery = Array.from(activeContent.querySelectorAll('.gallery-img'));
            
            // Encontrar el índice de la imagen a la que se le hizo clic
            currentIndex = currentGallery.indexOf(this);
            
            // Mostrar modal y actualizar imagen
            modal.style.display = "block";
            updateModalImage();
        });
    });

    // Función para actualizar la imagen en el modal
    function updateModalImage() {
        if(currentGallery.length > 0) {
            expandedImg.src = currentGallery[currentIndex].src;
            captionText.innerHTML = currentGallery[currentIndex].alt;
        }
    }

    // Botón Siguiente
    document.querySelector('.next-btn')?.addEventListener('click', function() {
        // Avanza 1, y si llega al final, vuelve a empezar (comportamiento circular)
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateModalImage();
    });

    // Botón Anterior
    document.querySelector('.prev-btn')?.addEventListener('click', function() {
        // Retrocede 1, y si llega al principio, va a la última
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateModalImage();
    });

    // Cerrar modal al hacer clic en la "X"
    closeModalBtn?.addEventListener('click', function () {
        modal.style.display = "none";
    });

    // Cerrar modal al hacer clic en el fondo oscuro
    modal?.addEventListener('click', function (event) {
        if (event.target === modal || event.target.className === "modal-content-wrapper") {
            modal.style.display = "none";
        }
    });

    // Soporte para teclado (Navegar con flechas y cerrar con Escape)
    document.addEventListener("keydown", function (event) {
        if (modal && modal.style.display === "block") {
            if (event.key === "Escape") {
                modal.style.display = "none";
            } else if (event.key === "ArrowRight") {
                document.querySelector('.next-btn').click();
            } else if (event.key === "ArrowLeft") {
                document.querySelector('.prev-btn').click();
            }
        }
    });

    console.log("Interactivity.js cargado: Tabs y Galería Modal listos.");
});