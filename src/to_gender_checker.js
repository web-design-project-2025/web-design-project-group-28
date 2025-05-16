const toGender = document.getElementById("toGender");
const password = localStorage.getItem("password");
const data = localStorage.getItem("data");

//checks if the user has a password stored in localstorage and changes the get started button to navigate to signup if they don't

if (password) {
  toGender.innerHTML = `<a href="gender.html">
      <button class="start-button">Continue</button></a
      >`;
} else {
  toGender.innerHTML = `<a href="signup.html">
      <button class="start-button">Get Started</button></a
    >`;
} //if the user has their data and account it redirects to workoutplans
if (data && password) {
  toGender.innerHTML = `<a href="workout-plans.html">
      <button class="start-button">Continue</button></a
    >`;
}
