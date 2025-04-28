let data = [];

async function loadMuscle() {
  const response = await fetch("https://wger.de/api/v2/muscle/");
  const exerciseData = await response.json();
  console.log(exerciseData);
  const foundMuscle = exerciseData.results.find((e) => e.name_en === "Biceps");

  console.log(foundMuscle);
}

loadMuscle();
