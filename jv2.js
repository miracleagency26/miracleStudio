document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("application-form");
    const formContainer = document.getElementById("form-container");
    const successMessage = document.getElementById("success-message");
    
    // LOGICA CUSTOM SELECT
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(customSelect => {
        const trigger = customSelect.querySelector('.custom-select-trigger');
        const options = customSelect.querySelectorAll('.custom-option');
        const hiddenInput = customSelect.closest('.custom-select-wrapper').querySelector('select');
        const triggerText = trigger.querySelector('span');

        // Toggle apertura/chiusura
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            customSelect.classList.toggle('open');
        });

        // Selezione di un'opzione
        options.forEach(option => {
            option.addEventListener('click', function() {
                triggerText.textContent = this.textContent;
                triggerText.style.color = "var(--text-light)";
                
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                hiddenInput.value = this.getAttribute('data-value');
                customSelect.classList.remove('open');
            });
        });
    });

    window.addEventListener('click', function() {
        customSelects.forEach(customSelect => {
            customSelect.classList.remove('open');
        });
    });

    // LOGICA INVIO EMAIL CON EMAILJS
    if(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Evita il ricaricamento della pagina

            const templateParams = {
                name: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                consulenza: document.getElementById("sfida").value
            };

            // INSERISCI QUI I TUOI ID DI EMAILJS
            const SERVICE_ID = ("service_b78v24e");
            const TEMPLATE_ID = ("template_zpebgw8");

            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    if(formContainer && successMessage) {
                        formContainer.style.display = "none";
                        successMessage.style.display = "block";
                    }
                    
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, function(error) {
                    console.log('FAILED...', error);
                    alert("Errore nell'invio della candidatura. Riprova.");
                });
        });
    }
});