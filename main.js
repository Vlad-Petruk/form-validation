const form = document.querySelector('.form');

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

const zipCode = document.getElementById('zip-code');
const zipCodeError = document.querySelector("#zip-code + span.error");

const password = document.getElementById('password');
const passwordError = document.querySelector("#password + span.error");

const confirmPassword = document.getElementById('confirm-password');
const confirmPasswordError = document.querySelector("#confirm-password + span.error");

const validationState = {
    email: false,
    // country: false,
    zipCode: false,
    password: false,
    passwordConfirmation: false,
};

function updateValidationState(field, isValid) {
    validationState[field] = isValid;
  }

function validateEmail() {
  if (email.validity.valueMissing) {

    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  } 
  // else if (email.validity.patternMismatch){
  //   emailError.textContent = `Email should be at least characters; you entered ${email.value.length}.`;
  // }

  // Set the styling appropriately
  // emailError.className = "error active";
};

function validateZipCode(zipCode) {

};

function validatePassword() {
  const isValidPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]*$/.test(password.value);

   

  if (password.validity.valueMissing) {

    passwordError.textContent = "You need to enter password";
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
  } 
  // if (isValidPattern) {
  //   password.classList.remove('error-active');
  //   passwordError.textContent = '';
  // } else {
  //   password.classList.add('error-active');
  //   passwordError.textContent = 'Password must contain at least one lowercase letter and one uppercase letter.';
  // }
  
};

function validateConfirmPassword() {
  if (confirmPassword.value !== validationState.password){
    confirmPasswordError.textContent = 'Passwords do not match!'
  }
};

function updatevalidatedFild (fieldType, objectProp) {
  fieldType.addEventListener('blur', ()=>{
    let isValid = fieldType.value
    updateValidationState(`${objectProp}`, isValid);
    console.log(validationState)
  })
}

function addValidatigListener(field, fieldError,objectProp){
  field.addEventListener("input", (event) => {

    if (field.validity.valid) {
      fieldError.textContent = ""; // Reset the content of the message
      fieldError.className = "error";
      updatevalidatedFild(field,objectProp);
    } else {
      if (field === email){
        validateEmail()
      } else if (field === password){
        validatePassword()
      }
      
    }
  });
}
addValidatigListener(email, emailError,'email');
addValidatigListener(password,passwordError,'password');
addValidatigListener(confirmPassword,confirmPasswordError, 'passwordConfirmation')




form.addEventListener("submit", (event) => {
  // if the email field is valid, we let the form submit
  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});