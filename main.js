const form = document.querySelector('.form');

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

const zipCode = document.getElementById('zip-code');
const zipCodeError = document.querySelector("#zip-code + span.error");

const password = document.getElementById('password');
const passwordError = document.querySelector("#password + span.error");

const confirmPassword = document.getElementById('confirm-password');
const confirmPasswordError = document.querySelector("#confirm-password + span.error");

// Main functions section

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

function resetErrorField(errorfield){
  errorfield.textContent = ""; 
    errorfield.className = "error";
}


//Email validation

email.addEventListener('input',()=>{
  if (email.validity.valid) {
    resetErrorField(emailError)
  } else {
      validateEmail();
  }
})

email.addEventListener('blur', ()=>{
  if (email.validity.valid) {
    resetErrorField(emailError)
    updateValidationState(`email`, email.value);
    console.log(validationState)
    } else {
    updateValidationState(`email`, false);
    console.log(validationState)
  }
})

function validateEmail() {
  if (email.validity.valueMissing) {

    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  } 
  // Set the styling appropriately
  emailError.className = "error active";
};


//Zip-code validation

function validateZipCode(zipCode) {

};


//Password validation

function isPasswordValid(password) {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordPattern.test(password);
}
password.addEventListener('input',()=>{
  if (password.validity.valid&&isPasswordValid(password.value)) {
    resetErrorField(passwordError)
  } else {
      validatePassword();
  }
})

password.addEventListener('blur', ()=>{
  if (password.validity.valid&&isPasswordValid(password.value)) {
    resetErrorField(passwordError)
    password.classList.remove('invalid');
    updateValidationState(`password`, password.value);
    console.log(validationState)
    } else {
    updateValidationState(`password`, false);
    console.log(validationState)
  }
})

function validatePassword() {
  if (password.validity.valueMissing) {

    passwordError.textContent = "You need to enter password";
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
  } else if (!isPasswordValid(password.value)) {
    password.classList.add('invalid');
    passwordError.textContent = 'Password must contain at least one lowercase letter, one digit and one uppercase letter.';
  }
  
};


//Password confirmation vaidation

confirmPassword.addEventListener('input',()=>{
  if (confirmPassword.validity.valid&&confirmPassword.value === validationState.password) {
    resetErrorField(confirmPasswordError)
  } else {
      validateConfirmPassword();
  }
})

confirmPassword.addEventListener('blur', ()=>{
  if (confirmPassword.validity.valid&&confirmPassword.value === validationState.password) {
    resetErrorField(confirmPasswordError)
    confirmPassword.classList.remove('invalid');
    updateValidationState(`passwordConfirmation`, confirmPassword.value);
    console.log(validationState)
    } else {
    updateValidationState(`passwordConfirmation`, false);
    console.log(validationState)
  }
})

function validateConfirmPassword() {
  if (confirmPassword.validity.valueMissing) {

    confirmPasswordError.textContent = "You need to confirm password";
  }
  if (confirmPassword.value !== validationState.password){
    confirmPassword.classList.add('invalid');
    confirmPasswordError.textContent = 'Passwords do not match!'
  }
};






