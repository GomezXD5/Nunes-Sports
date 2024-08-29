document.addEventListener('DOMContentLoaded', () => {
 const form = document.getElementById('register-form');
 
 form.addEventListener('submit', (e) => {
   e.preventDefault();
   
   const nome = document.getElementById('nome').value;
   const sobrenome = document.getElementById('sobrenome').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const confirmPassword = document.getElementById('confirm-password').value;
   
   // Validação simples
   if (password !== confirmPassword) {
     alert('As senhas não coincidem.');
     return;
   }

   // Verificar se o email já está cadastrado
   const users = JSON.parse(localStorage.getItem('users')) || [];
   if (users.some(u => u.email === email)) {
     alert('Esse email já está cadastrado.');
     return;
   }

   // Adicionar novo usuário ao localStorage
   const newUser = { nome, sobrenome, email, password };
   users.push(newUser);
   localStorage.setItem('users', JSON.stringify(users));

   alert('Cadastro realizado com sucesso!');
   window.location.href = '/index.html'; // Redirecionar para a página de login
 });
});