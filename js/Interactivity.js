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
       LÓGICA DEL MODAL DE GALERÍA (LIGHTBOX) v2
    ================================================== */

    const modal = document.getElementById("image-modal");
    const expandedImg = document.getElementById("expanded-img");
    const captionText = document.getElementById("caption");
    const closeModalBtn = document.querySelector(".close-modal");
    
    let currentGallery = []; 
    let currentIndex = 0;    

    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', function () {
            // 1. Verificar si estamos en una página con pestañas (como evaluaciones)
            const activeContent = document.querySelector('.class-content.active');
            
            if (activeContent) {
                // Si hay pestañas, agrupa solo las de la pestaña activa
                currentGallery = Array.from(activeContent.querySelectorAll('.gallery-img'));
            } else {
                // Si NO hay pestañas (verbos o conjugaciones), agrupa todas las de la página
                currentGallery = Array.from(document.querySelectorAll('.gallery-img'));
            }
            
            // 2. Encontrar el índice de la imagen clickeada
            currentIndex = currentGallery.indexOf(this);
            
            // 3. Mostrar modal y actualizar
            if(modal) {
                modal.style.display = "block";
                updateModalImage();
            }
        });
    });

    function updateModalImage() {
        if(currentGallery.length > 0) {
            expandedImg.src = currentGallery[currentIndex].src;
            captionText.innerHTML = currentGallery[currentIndex].alt;
        }
    }

    // Botón Siguiente
    document.querySelector('.next-btn')?.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateModalImage();
    });

    // Botón Anterior
    document.querySelector('.prev-btn')?.addEventListener('click', function() {
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
                document.querySelector('.next-btn')?.click();
            } else if (event.key === "ArrowLeft") {
                document.querySelector('.prev-btn')?.click();
            }
        }
    });

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


    /* ==================================================
       LÓGICA DEL QUIZ (CLASE 3)
    ================================================== */
    const checkAnswersBtn3 = document.getElementById("check-answers-btn-3");
    const quizFeedback3 = document.getElementById("quiz-feedback-3");

    if (checkAnswersBtn3) {
        checkAnswersBtn3.addEventListener("click", function() {
            let score = 0;
            const totalQuestions = 4;
            
            for (let i = 1; i <= totalQuestions; i++) {
                const selectedOption = document.querySelector(`input[name="c3q${i}"]:checked`);
                const questionContainer = document.querySelectorAll('.quiz-question-3')[i-1];
                
                questionContainer.style.backgroundColor = "transparent";

                if (selectedOption) {
                    if (selectedOption.value === "correct") {
                        score++;
                        questionContainer.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    } else {
                        questionContainer.style.backgroundColor = "rgba(231, 76, 60, 0.2)";
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    }
                }
            }

            if (score === totalQuestions) {
                quizFeedback3.style.color = "#27ae60";
                quizFeedback3.innerHTML = `¡Excelente! ${score}/${totalQuestions}. ¡Entendiste perfecto el pasado y los auxiliares! ⛏️`;
            } else {
                quizFeedback3.style.color = "#e74c3c";
                quizFeedback3.innerHTML = `Obtuviste ${score}/${totalQuestions}. Revisa los errores en rojo. ¡Ánimo!`;
            }
        });
    }


});


/* ==================================================
       LÓGICA DEL QUIZ (CLASE 4 - ENGLISH LOG)
    ================================================== */
    const checkAnswersBtn4 = document.getElementById("check-answers-btn-4");
    const quizFeedback4 = document.getElementById("quiz-feedback-4");

    if (checkAnswersBtn4) {
        checkAnswersBtn4.addEventListener("click", function() {
            let score = 0;
            const totalQuestions = 4; // Son 4 preguntas en el quiz del English Log
            
            for (let i = 1; i <= totalQuestions; i++) {
                const selectedOption = document.querySelector(`input[name="c4q${i}"]:checked`);
                const questionContainer = document.querySelectorAll('.quiz-question-4')[i-1];
                
                // Reiniciar el fondo por si el usuario corrige su respuesta
                questionContainer.style.backgroundColor = "transparent";

                if (selectedOption) {
                    if (selectedOption.value === "correct") {
                        score++;
                        questionContainer.style.backgroundColor = "rgba(46, 204, 113, 0.2)"; // Verde éxito
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    } else {
                        questionContainer.style.backgroundColor = "rgba(231, 76, 60, 0.2)"; // Rojo error
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    }
                }
            }

            // Mensaje de retroalimentación final
            if (score === totalQuestions) {
                quizFeedback4.style.color = "#27ae60";
                quizFeedback4.innerHTML = `¡Excelente! ${score}/${totalQuestions}. ¡Sabes usar el English Log a la perfección en el campo! 🧭`;
            } else {
                quizFeedback4.style.color = "#e74c3c";
                quizFeedback4.innerHTML = `Obtuviste ${score}/${totalQuestions}. Repasa las diferencias entre Chunks y Collocations en las pizarras.`;
            }
        });
    }

/* ==================================================
       LÓGICA DEL QUIZ (CLASE 5)
    ================================================== */
    const checkAnswersBtn5 = document.getElementById("check-answers-btn-5");
    const quizFeedback5 = document.getElementById("quiz-feedback-5");

    if (checkAnswersBtn5) {
        checkAnswersBtn5.addEventListener("click", function() {
            let score = 0;
            const totalQuestions = 4;
            
            for (let i = 1; i <= totalQuestions; i++) {
                const selectedOption = document.querySelector(`input[name="c5q${i}"]:checked`);
                const questionContainer = document.querySelectorAll('.quiz-question-5')[i-1];
                
                questionContainer.style.backgroundColor = "transparent";

                if (selectedOption) {
                    if (selectedOption.value === "correct") {
                        score++;
                        questionContainer.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    } else {
                        questionContainer.style.backgroundColor = "rgba(231, 76, 60, 0.2)";
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    }
                }
            }

            if (score === totalQuestions) {
                quizFeedback5.style.color = "#27ae60";
                quizFeedback5.innerHTML = `¡Impecable! ${score}/${totalQuestions}. ¡Ya sabes romper palabras como rocas sedimentarias! 🪨`;
            } else {
                quizFeedback5.style.color = "#e74c3c";
                quizFeedback5.innerHTML = `Obtuviste ${score}/${totalQuestions}. Repasa los prefijos y sufijos en las diapositivas.`;
            }
        });
    }

/* ==================================================
       LÓGICA DEL QUIZ (CLASE 6)
    ================================================== */
    const checkAnswersBtn6 = document.getElementById("check-answers-btn-6");
    const quizFeedback6 = document.getElementById("quiz-feedback-6");

    if (checkAnswersBtn6) {
        checkAnswersBtn6.addEventListener("click", function() {
            let score = 0;
            const totalQuestions = 5;
            
            for (let i = 1; i <= totalQuestions; i++) {
                const selectedOption = document.querySelector(`input[name="c6q${i}"]:checked`);
                const questionContainer = document.querySelectorAll('.quiz-question-6')[i-1];
                
                questionContainer.style.backgroundColor = "transparent";

                if (selectedOption) {
                    if (selectedOption.value === "correct") {
                        score++;
                        questionContainer.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    } else {
                        questionContainer.style.backgroundColor = "rgba(231, 76, 60, 0.2)";
                        questionContainer.style.borderRadius = "8px";
                        questionContainer.style.padding = "10px";
                    }
                }
            }

            if (score === totalQuestions) {
                quizFeedback6.style.color = "#27ae60";
                quizFeedback6.innerHTML = `¡Perfecto! ${score}/${totalQuestions}. Dominas la regla de la S y el orden del tiempo. ⏳`;
            } else {
                quizFeedback6.style.color = "#e74c3c";
                quizFeedback6.innerHTML = `Obtuviste ${score}/${totalQuestions}. Revisa el orden de los adverbios en las diapositivas.`;
            }
        });
    }