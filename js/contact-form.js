/* ============================================
   NELSON ART PRO - CONTACT-FORM.JS
   Fonctionnalités :
   - Validation en temps réel
   - Gestion des erreurs
   - Message de succès
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('form-success');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // ===== VALIDATION EN TEMPS RÉEL =====
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Le nom doit contenir au moins 2 caractères';
        } else {
            nameError.textContent = '';
        }
    });
    
    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Veuillez entrer une adresse email valide';
        } else {
            emailError.textContent = '';
        }
    });
    
    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Le message doit contenir au moins 10 caractères';
        } else {
            messageError.textContent = '';
        }
    });
    
    // ===== SOUMISSION DU FORMULAIRE =====
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validation Nom
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Le nom doit contenir au moins 2 caractères';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Validation Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Veuillez entrer une adresse email valide';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Validation Message
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Le message doit contenir au moins 10 caractères';
            isValid = false;
        } else {
            messageError.textContent = '';
        }
        
        if (isValid) {
            // Simulation d'envoi (à remplacer par votre backend)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner spinner"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Réinitialiser le formulaire
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Afficher le message de succès
                formSuccess.style.display = 'block';
                
                // Cacher le message après 5 secondes
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
                
                // Faire défiler vers le message de succès
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            }, 1500);
            
            // Pour un vrai envoi, utilisez ce code :
            /*
            fetch('votre-endpoint.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: document.getElementById('subject').value,
                    message: messageInput.value
                })
            })
            .then(response => response.json())
            .then(data => {
                // Gérer la réponse
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
            */
        }
    });
    
    // ===== ANIMATION INPUT FOCUS =====
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});