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

let slider = document.getElementById("height-slider");
let displayWeight = document.getElementById("height-display");

slider.addEventListener("input", (e) => {
  let vikt = slider.value;
  let color = slider.value;
  if (vikt > 219) {
    vikt = "220 +";
    displayWeight.innerHTML = `<span><h3 id="color-changer">${vikt}</h3></span><span><h3>cm</h3></span>`;
  }
  userData.forEach((e) => {
    e.height = vikt;
    console.log(e.height);
  });
  displayWeight.innerHTML = `<h3 id="color-changer">${vikt} cm</h3>`;
  let colorChanger = document.getElementById("color-changer");
  colorChanger.style.color = `rgb(255, 136, ${color})`;
  localStorage.setItem("data", JSON.stringify(userData));
});
