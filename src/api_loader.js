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

let data = [];

async function loadMuscle() {
  const response = await fetch("https://wger.de/api/v2/muscle/");
  const exerciseData = await response.json();

  const foundMuscle = exerciseData.results.find((e) => e.id === 2);

  console.log(exerciseData);
}

loadMuscle();
