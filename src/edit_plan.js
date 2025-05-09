document.addEventListener("DOMContentLoaded", () => {
  const title = localStorage.getItem("selectedWorkoutTitle");
  const goal = localStorage.getItem("selectedGoal");
  const days = localStorage.getItem("daysPerWeek");

  const titleEl = document.getElementById("day-title");
  const listEl = document.getElementById("exercise-list");
  const inputEl = document.getElementById("new-exercise-name");
  const addBtn = document.getElementById("add-btn");
  const saveBtn = document.getElementById("save-btn");

  if (!title || !goal || !days) {
    titleEl.textContent = "Missing plan data.";
    return;
  }

  titleEl.textContent = `Edit: ${title}`;
  let currentExercises = [];

  fetch("../data/workout_plans.json")
    .then(res => res.json())
    .then(data => {
      const plan = data[goal.toLowerCase()]?.[days];
      const dayExercises = plan?.find(d => d === title);
      if (!dayExercises) {
        currentExercises = [];
      } else {
        currentExercises = getCustomPlan() || getDefaultExercises(title);
      }
      renderExercises();
    });

  function getDefaultExercises(title) {
    // You can refine this using a master lookup in future
    const all = {
      "Chest and Triceps": ["Bench Press", "Chest Press", "Pec Dec Fly", "Triceps Pushdown", "Overhead Press", "Triceps Press"],
      "Shoulders and Core": ["Shoulder Press", "Lateral Raises", "Front Raises", "Reverse Pec Dec", "Abdominal Press", "Rotary Torso"],
      "Back and Biceps": ["Lat Pull Down", "Low Row", "Lat Pull Overs", "Incline Biceps Curl", "Hammer Curls", "Barbell Curls"],
      // I will add other workouts as needed...
    };
    return all[title] || [];
  }

  function getCustomPlan() {
    const key = `customPlan-${goal}-${days}-${title}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  }

  function saveCustomPlan() {
    const key = `customPlan-${goal}-${days}-${title}`;
    localStorage.setItem(key, JSON.stringify(currentExercises));
    alert("Plan saved!");
  }

  function renderExercises() {
    listEl.innerHTML = "";
    if (currentExercises.length === 0) {
      listEl.innerHTML = "<p>No exercises added yet.</p>";
      return;
    }

    currentExercises.forEach((exercise, index) => {
      const item = document.createElement("div");
      item.className = "exercise-item";
      item.innerHTML = `
        <span>${exercise}</span>
        <button onclick="removeExercise(${index})">Remove</button>
      `;
      listEl.appendChild(item);
    });
  }

  window.removeExercise = function(index) {
    currentExercises.splice(index, 1);
    renderExercises();
  };

  addBtn.addEventListener("click", () => {
    const newExercise = inputEl.value.trim();
    if (newExercise) {
      currentExercises.push(newExercise);
      inputEl.value = "";
      renderExercises();
    }
  });

  saveBtn.addEventListener("click", saveCustomPlan);
});
