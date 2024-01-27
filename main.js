const form = document.querySelector('.form');

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

const zipCode = document.getElementById('zip-code');
const zipCodeError = document.querySelector("#zip-code + span.error");

const password = document.getElementById('password');
const passwordError = document.querySelector("#password + span.error");

const confirmPassword = document.getElementById('confrm-password');
const confirmPasswordError = document.querySelector("#confrm-password + span.error");

const validationState = {
    email: false,
    country: false,
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
  emailError.className = "error active";
};

function validateZipCode(zipCode) {

};

function validatePassword() {
  if (password.validity.valueMissing) {

    passwordError.textContent = "You need to enter an email address.";
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Email should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
  }
};

function validateConfirmPassword(confirmPasswordd) {

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
      showError();
    }
  });
}
addValidatigListener(email, emailError,'email')
// email.addEventListener("input", (event) => {

//   if (email.validity.valid) {
//     emailError.textContent = ""; // Reset the content of the message
//     emailError.className = "error";
//     updatevalidatedFild(email,'email');
//   } else {
//     showError();
//   }
// });



function showError() {
  validateEmail();
}

form.addEventListener("submit", (event) => {
  // if the email field is valid, we let the form submit
  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});