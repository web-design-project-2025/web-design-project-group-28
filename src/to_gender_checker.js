const toGender = document.getElementById("toGender");
const password = localStorage.getItem("password");

//checks if the user has a password stored in localstorage and changes the get started button to navigate to signup if they don't

if (password) {
  toGender.innerHTML = `<a href="gender.html">
      <button class="start-button">Get Started</button></a
      >`;
} else {
  toGender.innerHTML = `<a href="signup.html">
      <button class="start-button">Get Started</button></a
    >`;
}
