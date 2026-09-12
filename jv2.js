document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("application-form");
    const formContainer = document.getElementById("form-container");
    const successMessage = document.getElementById("success-message");
    
    if(form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const templateParams = {
                name: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                consulenza: document.getElementById("sfida").value
            };

            const SERVICE_ID = "service_b78v24e";
            const TEMPLATE_ID = "template_zpebgw8";

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