const myApp = new App();

const showRegisterFormButton = document.getElementById('showRegisterFormButton');
const showLoginFormButton = document.getElementById('showLoginFormButton');
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');

showRegisterFormButton.addEventListener('click', function() {
  registrationForm.style.display = 'block';
  loginForm.style.display = 'none';
});

showLoginFormButton.addEventListener('click', function() {
  loginForm.style.display = 'block';
  registrationForm.style.display = 'none';
});

document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const nickname = document.getElementById('nickname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const registrationStatus = myApp.registerUser(name, nickname, email, password, confirmPassword);

  if (registrationStatus) {
    alert("Registration successful!");
  } else {
    alert("Registration failed. Please check the form and try again.");
  }
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;

  const loginStatus = myApp.loginUser(loginEmail, loginPassword);

  if (loginStatus) {
    window.location.href = "home.html";
  } else {
    alert("Login failed. Please check your email and password.");
  }
});


    