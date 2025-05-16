let userData = [];

//loads data from localstorage

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

let slider = document.getElementById("height-slider");
let displayWeight = document.getElementById("height-display");

slider.addEventListener("input", (e) => {
  let vikt = slider.value;
  let color = slider.value;
  if (vikt > 219) {
    //displays 220+ if the user has the slider above 219
    vikt = "220+";
    displayWeight.innerHTML = `<span><h3 id="color-changer">${vikt}</h3>`;
  }
  userData.forEach((e) => {
    e.height = vikt;
    console.log(e.height);
  });
  displayWeight.innerHTML = `<h3 id="color-changer">${vikt}cm</h3>`; //displays weight
  let colorChanger = document.getElementById("color-changer");
  colorChanger.style.color = `rgb(255, 136, ${color})`; // changes color
  localStorage.setItem("data", JSON.stringify(userData));
});
