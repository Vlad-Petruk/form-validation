const form = document.querySelector('.form');

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

const countrySelect = document.getElementById('country');

const zipCode = document.getElementById('zip-code');
const zipCodeError = document.querySelector("#zip-code + span.error");

const password = document.getElementById('password');
const passwordError = document.querySelector("#password + span.error");

const confirmPassword = document.getElementById('confirm-password');
const confirmPasswordError = document.querySelector("#confirm-password + span.error");

const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');

// Main functions section

const validationState = {
    email: false,
    country: 'Ukraine',
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

submitBtn.addEventListener('click',()=>{
  if(validationState.email !== false&&validationState.zipCode !== false&&validationState.password !== false&&validationState.passwordConfirmation !== false) {
    alert('Congrats!')
  } else alert('You need to fill all field properly!')
})

resetBtn.addEventListener('click',()=>{
  email.value = '';
  zipCode.value = '';
  password.value = '';
  confirmPassword.value = '';
  validationState.email = false;
  validationState.country = 'Ukraine';
  validationState.zipCode = false;
  validationState.password = false;
  validationState.passwordConfirmation = false;

})
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

//Country and zip-code validation

const ukraineZipPattern = /^\d{5}$/;
const polandZipPattern = /^\d{2}-\d{3}$/;
const ukZipPattern = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/;
const surinamZipPattern = /^\d{4}$/;
countrySelect.addEventListener('change', () => {
  updateValidationState('country', countrySelect.value);

  updateZipCodeValidation();
});

zipCode.addEventListener('input', updateZipCodeValidation);
zipCode.addEventListener('blur', updateZipCodeValidation);

updateZipCodeValidation();

function updateZipCodeValidation() {
  // Determine the zip code pattern based on the selected country
  const zipPattern = getZipPattern();

  if (zipPattern.test(zipCode.value)) {
      zipCodeError.textContent = '';
      zipCode.classList.remove('invalid');
      updateValidationState('zipCode', zipCode.value);
      console.log(validationState);
  } else {
      zipCode.classList.add('invalid');
      switch (validationState.country) {
        case 'Ukraine':
          zipCodeError.textContent = 'Invalid zip code for the selected country. Correct example: 12312';
          updateValidationState('zipCode', false);
          console.log(validationState);
          break;
        case 'Poland':
          zipCodeError.textContent = 'Invalid zip code for the selected country. Correct example: 12-312';
          updateValidationState('zipCode', false);
          console.log(validationState);
          break;
        case 'UK':
          zipCodeError.textContent = 'Invalid zip code for the selected country. Correct example: AB12 3CD';
          updateValidationState('zipCode', false);
          console.log(validationState);
          break;
        case 'Surinam':
          zipCodeError.textContent = 'Invalid zip code for the selected country. Correct example: 2323';
          updateValidationState('zipCode', false);
          console.log(validationState);
          break;
        default:
            
  //     zipCodeError.textContent = 'Invalid zip code for the selected country';
  //     updateValidationState('zipCode', false);
  //     console.log(validationState);
  }
}

// Function to get the zip code pattern based on the selected country
function getZipPattern() {
  switch (validationState.country) {
      case 'Ukraine':
          return ukraineZipPattern;
      case 'Poland':
          return polandZipPattern;
      case 'UK':
          return ukZipPattern;
      case 'Surinam':
          return surinamZipPattern;
      default:
          return /^\d+$/; // Default pattern for other countries (any digits)
  }
}



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

}