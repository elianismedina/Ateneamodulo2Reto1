const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameLetters = /^[A-Za-z ]+$/;

let matchingPasswords = false;
let isValidEmail = false;
let isValidPassword = false;
let isValidName = false;
let form = document.getElementById('signupForm');

function emailExists(email) {
  let isValid = false;
  $.ajax({
  url: 'http://localhost:8090/api/user/' +email,
   type: 'GET',
   dataType: 'json',
   async: false,
   success: function(response) {
      isValid = Boolean(response)
      },
      error: function(response) {
         console.log("ERROR - no se pudo verifica el email");
      }
  })
  return isValid;
};
form.addEventListener('input', function(event) {
   const formData = new FormData(form);
   const name = formData.get('inputName');
   const email = formData.get('inputEmail');
   const password = formData.get('inputPassword');
   const confirmPassword = formData.get('inputConfirmPassword');

   isValidName =nameLetters.test(name);
   isValidEmail = emailFormat.test(email);
   isValidPassword = password.length >= 6;
   matchingPasswords = password === confirmPassword && password !== '';
   if(isValidName){
      document.getElementById('inputName').classList.remove('is-invalid');
      document.getElementById('inputName').classList.add('is-valid');
   }else{
      document.getElementById('inputName').classList.remove('is-valid');
      document.getElementById('inputName').classList.add('is-invalid');
   }
   if(isValidEmail){
         document.getElementById('inputEmail').classList.remove('is-invalid');
         document.getElementById('inputEmail').classList.add('is-valid');
   }else{
         document.getElementById('inputEmail').classList.remove('is-valid');
         document.getElementById('inputEmail').classList.add('is-invalid');
         document.getElementById('emailErrorMsg').innerText = 'Ingresa un email valido';
   }
   if(isValidPassword){
          document.getElementById('inputPassword').classList.remove('is-invalid');
          document.getElementById('inputPassword').classList.add('is-valid');
   }else{
          document.getElementById('inputPassword').classList.remove('is-valid');
          document.getElementById('inputPassword').classList.add('is-invalid');
   }
   if(matchingPasswords){
         document.getElementById('inputConfirmPassword').classList.remove('is-invalid');
         document.getElementById('inputConfirmPassword').classList.add('is-valid');
   }else{
         document.getElementById('inputConfirmPassword').classList.remove('is-valid');
         document.getElementById('inputConfirmPassword').classList.add('is-invalid');
   }
});
form.addEventListener('submit', function(event){
   let email = document.getElementById('inputEmail').value;

   if(!form.checkValidity() || !isValidName || !isValidEmail || !isValidPassword || !matchingPasswords || emailExists(email)){
      if(isValidEmail && emailExists(email)){
         document.getElementById('inputEmail').classList.remove('is-valid');
         document.getElementById('inputEmail').classList.add('is-invalid');
         document.getElementById('emailErrorMsg').innerText = "Este email ya se encuentra registrado.";
      }
      console.log("No son campos válidos");
      event.preventDefault();
      event.stopPropagation();
   }else{
      let datos = {
         'email': document.getElementById('inputEmail').value,
         'name': document.getElementById('inputName').value,
         'password': document.getElementById('inputPassword').value,
      }
      $.ajax({
         url: 'http://localhost:8090/api/user/new',
         type: 'POST',
         data: JSON.stringify(datos),
         contentType: 'application/json',
         dataType: 'json',
         async: false,
         success: function(response) {
            sessionStorage.setItem('username', response.name);
         },
         error: function() {
            console.log("Error de petición al agregar usuario");
         }
      })
   };

});
