const form = document.getElementById("form");
const firstName = document.getElementById("first-name-input");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const passwordRepeat = document.getElementById("repeat-password-input");

form.addEventListener("submit", (e) => {
  let errors = [];
  if (firstName) {
    errors = signUpErrors(firstName, email, password, passwordRepeat);
  } else {
    errors = loginErrors(email.value, password.value);
  }
  if (errors.length > 0) {
    e.preventDefault(); //prevent from submitting if there are any errors
  }
});

function signUpErrors(firstName, email, password, passwordRepeat) {
  let errors = [];

  //checker that the user has put something in the form

  if (!firstName.value) {
    errors.push("Enter your name");
    firstName.parentElement.classList.add("incorrect");
  }

  if (!email.value) {
    errors.push("Enter your email");
    email.parentElement.classList.add("incorrect");
  }

  if (!password.value) {
    errors.push("Enter your password");
    password.parentElement.classList.add("incorrect");
  }

  if (!passwordRepeat.value) {
    errors.push("Please repeat your password");
    passwordRepeat.parentElement.classList.add("incorrect");
  }

  return errors;
}
