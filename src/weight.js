let userData = [];

//parses the data stored in localstorage

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

let slider = document.getElementById("weight-slider");
let displayWeight = document.getElementById("weight-display");

slider.addEventListener("input", (e) => {
  let vikt = slider.value;
  let color = slider.value;
  if (vikt > 249) {
    //if weight is above is 250 then it will change to a "+"
    vikt = "250 +";
    displayWeight.innerHTML = `<span><h3 id="color-changer">${vikt}</h3></span><span><h3>kg</h3></span>`;
  }
  userData.forEach((e) => {
    e.weight = vikt;
    console.log(e.weight);
  });
  displayWeight.innerHTML = `<h3 id="color-changer">${vikt}kg</h3>`; //displays the weight
  let colorChanger = document.getElementById("color-changer");
  colorChanger.style.color = `rgb(255, 136, ${color})`; // changes the color
  localStorage.setItem("data", JSON.stringify(userData));
});
