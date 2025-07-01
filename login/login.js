document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Manejo del registro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const repeatPassword = document.getElementById('register-repeat-password').value;
            const cardNumber = document.getElementById('register-card').value;

            // Validación del número de tarjeta
            if (cardNumber.length < 16 || !/^\d+$/.test(cardNumber)) {
                alert('El número de tarjeta debe tener al menos 16 dígitos.');
                return;
            }

            // Validación de coincidencia de contraseñas
            if (password !== repeatPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Guardo los datos en localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            localStorage.setItem('userCard', cardNumber);

            alert('Registro exitoso');
            registerForm.reset();
            // Redirigir a la página de inicio de sesión.
            window.location.href = 'login.html';
        });
    }

    // Manejar el inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Obtengo los datos de localStorage
            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                alert('Inicio exitoso');
                loginForm.reset();
            } else {
                alert('Correo o contraseña incorrectos');
            }
        });
    }
});