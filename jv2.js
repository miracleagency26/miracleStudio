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
                // Aggiorna il testo e il colore
                triggerText.textContent = this.textContent;
                triggerText.style.color = "var(--text-light)";
                
                // Gestione classe 'selected'
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                // Passa il valore al select nativo nascosto
                hiddenInput.value = this.getAttribute('data-value');
                
                // Chiudi il menu
                customSelect.classList.remove('open');
            });
        });
    });

    // Chiudi il menu se l'utente clicca in un punto qualsiasi dello schermo
    window.addEventListener('click', function() {
        customSelects.forEach(customSelect => {
            customSelect.classList.remove('open');
        });
    });

    if(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Evita il ricaricamento della pagina
            
            // Qui in futuro potrai inserire una chiamata API o un webhook (es. verso Zapier, Make o il tuo CRM)
            // fetch('tuo-endpoint', { method: 'POST', body: new FormData(form) })

            // Effetto UI: Nasconde il form e mostra il messaggio di successo
            formContainer.style.display = "none";
            successMessage.style.display = "block";
            
            // Scroll automatico in alto per far leggere il messaggio su mobile
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
