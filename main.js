const form = document.querySelector('.form');

const email = document.getElementById('email');
const emailError = document.querySelector("#email + span.error");

const zipCode = document.getElementById('zip-code');
const zipCodeError = document.querySelector("#email + span.error");

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

};

function validateZipCode() {

};

function validatePassword() {

};

function validateConfirmPassword() {

};