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

const day1 = document.getElementById("1");
const day2 = document.getElementById("2");
const day3 = document.getElementById("3");
const day4 = document.getElementById("4");
const day5 = document.getElementById("5");
const day6 = document.getElementById("6");
const day7 = document.getElementById("7");

//example how we will get the right workoutplan for the goal selected

userData.forEach((e) => {
  if (e.gender === false) {
    day1.innerHTML = `<h1>Day 1</h1>
        <p>Build muscle</p>`;
  } else {
    `<h1>Day 1</h1>
        <p>Dont build muscle</p>`;
  }
});
