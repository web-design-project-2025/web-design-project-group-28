//getting password and email from local storage
const userEmail = localStorage.getItem("email");
const userPassword = localStorage.getItem("password");

console.log(userEmail);
console.log(userPassword);

const form = document.getElementById("form");
const errorMessage = document.getElementById("error-message");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");

/*
Used a youtube video for working with this page. Used some of the code from video but tweaked it according to our needs. 
Link to the video: https://www.youtube.com/watch?v=bVl5_UdcAy0&t=1s 
*/

form.addEventListener("submit", (e) => {
  const errors = loginErrors(email, password);

  if (errors.length > 0) {
    e.preventDefault(); //prevent from submitting if there are any errors
    errorMessage.innerText = errors.join(", ");
  } else {
    e.preventDefault();
    window.location.href = "index.html";
  }
});

function loginErrors(email, password) {
  let errors = [];

  //checker that the user has put something in the form

  if (!email.value) {
    errors.push("Enter your email");
    email.parentElement.classList.add("incorrect");
  }

  if (!password.value) {
    errors.push("Enter your password");
    password.parentElement.classList.add("incorrect");
  }

  //checks the users so that the user password matches with the typed in password

  if (email.value !== userEmail) {
    errors.push("Couldn't find that email");
    password.parentElement.classList.add("incorrect");
  }

  if (password.value !== userPassword) {
    errors.push("Wrong password!");
    password.parentElement.classList.add("incorrect");
  }

  return errors;
}

const inputs = [email, password]; //removes the errors when the user types something again

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      errorMessage.innerText = "";
    }
  });
});
