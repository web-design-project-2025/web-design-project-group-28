// Function to load exercise data from JSON and update DOM
async function loadExerciseData() {
  const params = new URLSearchParams(window.location.search);
  const exerciseName = params.get("exercise");

  if (!exerciseName) return;

  const response = await fetch("exercises.json");
  const exercises = await response.json();

  const exercise = exercises.find(
    (ex) => ex["Exercise Name"].toLowerCase() === exerciseName.toLowerCase()
  );

  if (exercise) {
    document.getElementById("exercise-name").innerText = `${exercise["Exercise Name"]} – Barbell`;
    document.getElementById("focus-area").innerText = exercise["Focus Area"];
    document.getElementById("equipment").innerText = exercise["Equipment"];
    document.getElementById("preparation").innerText = exercise["Preparation"];
    document.getElementById("execution").innerText = exercise["Execution"];
    document.getElementById("key-tips").innerText = exercise["Key Tips"];
    
    // Optional: Map image name by exercise name
    document.getElementById("exercise-image").src = `images/${exercise["Exercise Name"].toLowerCase().replace(/ /g, "_")}.jpg`;
  }
}

function goBack() {
  window.history.back();
}

document.addEventListener("DOMContentLoaded", loadExerciseData);
