async function login(email, password) {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {
            console.log('Token recibido:', data.token);
            localStorage.setItem('token', data.token);
            window.location.href = '/home-admin';
        } else {
            console.error('Error en la respuesta del servidor:', data);
            alert('Inicio de sesión fallido. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error interno del servidor');
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});