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

    /* ==================================================
       LÓGICA DEL QUIZ (CLASE 2)
    ================================================== */
    const checkAnswersBtn = document.getElementById("check-answers-btn");
    const quizFeedback = document.getElementById("quiz-feedback");

    if (checkAnswersBtn) {
        checkAnswersBtn.addEventListener("click", function() {
            let score = 0;
            const totalQuestions = 4;
            
            // Recorre cada pregunta (q1, q2, q3, q4)
            for (let i = 1; i <= totalQuestions; i++) {
                const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
                const questionContainer = document.querySelectorAll('.quiz-question')[i-1];
                
                // Reiniciar color de fondo
                questionContainer.style.backgroundColor = "transparent";

                if (selectedOption) {
                    if (selectedOption.value === "correct") {
                        score++;
                        questionContainer.style.backgroundColor = "rgba(46, 204, 113, 0.2)"; // Verde claro
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    } else {
                        questionContainer.style.backgroundColor = "rgba(231, 76, 60, 0.2)"; // Rojo claro
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    }
                }
            }

            // Mostrar el resultado final
            if (score === totalQuestions) {
                quizFeedback.style.color = "#27ae60";
                quizFeedback.innerHTML = `¡Excelente! ${score}/${totalQuestions}. ¡Está listo para el trabajo de campo! ⛏️ (se merece una pola)`;
            } else {
                quizFeedback.style.color = "#e74c3c";
                quizFeedback.innerHTML = `Obtuviste ${score}/${totalQuestions}. Revise las preguntas en rojo e inténtelo de nuevo. Me puede escribir`;
            }
        });
    }

});