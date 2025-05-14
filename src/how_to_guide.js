// Function to normalize strings for comparison
function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, '_');
}

// Function to load exercise data from JSON and update the DOM
async function loadExerciseData() {
  const params = new URLSearchParams(window.location.search);
  const exerciseName = params.get("exercise");

  if (!exerciseName) return;

  try {
    const response = await fetch("../data/exercise_data.json");
    const exercises = await response.json();

    // Finding the matching exercise (case-insensitive, ignores spaces)
    const matchedExercise = exercises.find(
      (ex) => normalize(ex["Exercise Name"]) === normalize(exerciseName)
    );

    if (matchedExercise) {
      document.getElementById("exercise-name").innerText = matchedExercise["Exercise Name"];
      document.getElementById("focus-area").innerText = matchedExercise["Focus Area"];
      document.getElementById("equipment").innerText = matchedExercise["Equipment"];
      document.getElementById("preparation").innerText = matchedExercise["Preparation"];
      document.getElementById("execution").innerText = matchedExercise["Execution"];
      document.getElementById("key-tips").innerText = matchedExercise["Key Tips"];

      // Loading the images
      const imageName = normalize(matchedExercise["Exercise Name"]);
      const imgEl = document.getElementById("exercise-image");
      imgEl.src = `../exercise_images/${imageName}.png`;
      imgEl.onerror = () => {
        imgEl.onerror = null;
        imgEl.src = "../exercise_images/placeholder.png";
      };

    } else {
      document.querySelector(".guide-card").innerHTML = `<p>Exercise not found: ${exerciseName}</p>`;
      console.warn("Exercise not found:", exerciseName);
    }
  } catch (err) {
    console.error("Failed to load exercise data:", err);
    document.querySelector(".guide-card").innerHTML = `<p>Error loading exercise data.</p>`;
  }
}

// Navigate back to the previous page
function goBack() {
  window.history.back();
}

// Load data once DOM is ready
document.addEventListener("DOMContentLoaded", loadExerciseData);
