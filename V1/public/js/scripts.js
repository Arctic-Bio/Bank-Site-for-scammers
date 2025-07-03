document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = new FormData(this);
      fetch('/login', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          errorMessage.textContent = data.message;
          errorMessage.classList.remove('d-none');
        }
      })
      .catch(error => {
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.classList.remove('d-none');
      });
    });
  }
});
