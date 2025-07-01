document.addEventListener('DOMContentLoaded', () => {
    const idiomaInput = document.getElementById('idiomas-choice');
    
    const texts = {
        "Español": {
            "label-idiomas": "Idiomas",
            "button-login": "Iniciar sesión",
            "header-title": "Películas y series ilimitadas y mucho más",
            "header-subtitle": "Disfruta donde quieras. Cancela cuando quieras.",
            "header-description": "¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.",
            "label-email": "Email o número de celular",
            "label-password": "Contraseña",
            "label-repeat-password": "Repita su contraseña",
            "label-card": "Nro Tarjeta",
            "button-register": "Registrarse"
        },
        "English": {
            "label-idiomas": "Languages",
            "button-login": "Sign In",
            "header-title": "Unlimited movies and TV shows, and more",
            "header-subtitle": "Watch anywhere. Cancel anytime.",
            "header-description": "Ready to watch Netflix? Enter your email to create or restart your membership.",
            "label-email": "Email or phone number",
            "label-password": "Password",
            "label-repeat-password": "Repeat your password",
            "label-card": "Card Number",
            "button-register": "Register"
        }
    };

    function updateText(language) {
        for (const [key, value] of Object.entries(texts[language])) {
            document.getElementById(key).textContent = value;
        }
    }

    idiomaInput.addEventListener('input', () => {
        const selectedLanguage = idiomaInput.value;
        if (texts[selectedLanguage]) {
            updateText(selectedLanguage);
        }
    });

    // Initialize the text with the default language
    updateText('Español');
});
/*
var check = document.querySelector(".check");
check.addEventListener('click',idioma);
function idioma(){
    let id= check.checked;
    if (id == true){
        location.href="Español/formulario.html";
    }
    else {
        location.href="../Ingles/form.html";
    }
}*/