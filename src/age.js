let userData = [];

async function loadUserData() {
  try {
    const response = await JSON.parse(localStorage.getItem("data"));
    userData = response;
    console.log("fungerar", userData);
  } catch (error) {
    console.log("error", error);
  }
}

loadUserData();

let slider = document.getElementById("age-slider");
let displayWeight = document.getElementById("age-display");

slider.addEventListener("input", (e) => {
  let vikt = slider.value;
  let color = slider.value * 2.5;
  if (vikt > 99) {
    vikt = "99 +";
    displayWeight.innerHTML = `<h3 id="color-changer">${vikt}</h3>`;
  }
  userData.forEach((e) => {
    e.age = vikt;
    console.log(e.age);
  });
  displayWeight.innerHTML = `<h3 id="color-changer">${vikt}</h3>`;
  let colorChanger = document.getElementById("color-changer");
  colorChanger.style.color = `rgb(255, 136, ${color})`;
  localStorage.setItem("data", JSON.stringify(userData));
});
