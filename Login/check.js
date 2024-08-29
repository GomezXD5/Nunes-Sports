document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar se o email e a senha estão no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Login bem-sucedido
      alert('Login bem-sucedido!');
      // Redirecionar para a página inicial ou para o dashboard
      window.location.href = '/home/home.html'; // Altere para a URL da sua página inicial
    } else {
      // Falha no login
      alert('Email ou senha incorretos.');
    }
  });
});

