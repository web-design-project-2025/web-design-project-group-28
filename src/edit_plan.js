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
    const all = {
      "Chest and Triceps": ["Bench Press", "Chest Press", "Pec Dec Fly", "Triceps Pushdown", "Overhead Press", "Triceps Press"],
      "Shoulders and Core": ["Shoulder Press", "Lateral Raises", "Front Raises", "Reverse Pec Dec", "Abdominal Press", "Rotary Torso"],
      "Back and Biceps": ["Lat Pull Down", "Low Row", "Lat Pull Overs", "Incline Biceps Curl", "Hammer Curls", "Barbell Curls"],
      "Legs": ["Squats", "Lunges", "Leg Press", "Leg Extension", "Leg Curls", "Calf Raises"],
      "Cardio": ["Treadmill Run", "Cycling", "Incline Walking"],
      "Full Body": ["Bench Press", "Chest Press", "Shoulder Press", "Lat Pull Overs", "Barbell Curls", "Triceps Press", "Leg Press", "Abdominal Press", "Deadlifts"],
      "Push Day": ["Bench Press", "Chest Press", "Shoulder Press", "Lateral Raises", "Reverse Pec Dec", "Triceps Press", "Overhead Press", "Triceps Pushdown"],
      "Pull Day": ["Lat Pull Down", "Low Row", "Lat Pull Overs", "Incline Biceps Curl", "Hammer Curls", "Barbell Curls"],
      "Upper Body": ["Bench Press", "Chest Press", "Shoulder Press", "Lat Pull Down", "Lat Pull Overs", "Triceps Press", "Barbell Curls", "Abdominal Press"],
      "Lower Body": ["Squats", "Lunges", "Leg Press", "Leg Extension", "Leg Curls", "Calf Raises"],
      "Lower Body + Cardio": ["Squats", "Lunges", "Leg Press", "Leg Extension", "Leg Curls", "Calf Raises", "Incline Walking"],
      "Push Day + Core": ["Bench Press", "Chest Press", "Shoulder Press", "Lateral Raises", "Reverse Pec Dec", "Triceps Press", "Overhead Press", "Triceps Pushdown", "Abdominal Press", "Leg Raises", "Rotary Torso"],
      "Lower Body + HIIT": ["Plank", "Pushups", "Mountain Climbers", "Squats", "Lunges", "Leg Press", "Leg Extension", "Leg Curls", "Calf Raises"],
      "Pull Day + Core": ["Lat Pull Down", "Low Row", "Lat Pull Overs", "Incline Biceps Curl", "Hammer Curls", "Barbell Curls", "Abdominal Press", "Rotary Torso", "Leg Raises"],
      "Full Body + Light Cardio": ["Bench Press", "Chest Press", "Shoulder Press", "Lat Pull Overs", "Barbell Curls", "Triceps Press", "Leg Press", "Abdominal Press", "Deadlifts", "Incline Walking"],
      "Metabollic Circuit": ["Treadmill Run", "Incline Walking", "Stair Climbers"],
      "Core + Cardio": ["Abdominal Press", "Rotary Torso", "Leg Raises", "Flutter Kicks", "Plank", "Incline Walking", "Cycling"],
      "Push Day + Light Cardio": ["Bench Press", "Chest Press", "Shoulder Press", "Lateral Raises", "Reverse Pec Dec", "Triceps Press", "Overhead Press", "Triceps Pushdown", "Incline Walking"],
      "Pull Day + Light Cardio": ["Lat Pull Down", "Low Row", "Lat Pull Overs", "Incline Biceps Curl", "Hammer Curls", "Barbell Curls", "Incline Walking"],
      "Lower Body + Light Cardio": ["Squats", "Lunges", "Leg Press", "Leg Extension", "Leg Curls", "Calf Raises", "Incline Walking"],
      "Lower Body + Core + Light Cardio": ["Squats", "Lunges", "Leg Press", "Leg Extension", "Leg Curls", "Calf Raises", "Rotary Torso", "Abdominal Press", "Incline Walking"],
      "Intense Cardio + HIIT Session": ["Plank", "Pushups", "Squats", "Jumping Jacks", "Mountain Climbers", "Treadmill Run", "Incline Walking", "Cycling"],
      "Running Intervals + Incline Walking": ["Treadmill Run", "Incline Walking"],
      "Cycling Intervals + Stair Climbers": ["Cycling", "Stair Climbers"],
      "Treadmill Jog Intervals": ["Treadmill Run"],
      "Stair Climbers + HIIT": ["Plank", "Pushups", "Squats", "Jumping Jacks", "Mountain Climbers", "Stair Climbers"],
      "Cycling Intervals": ["Cycling"],
      "Incline Walking": ["Incline Walking"],
      "Lower Body + Core": ["Squats", "Lunges", "Leg Press", "Leg Extension", "Leg Curls", "Calf Raises", "Abdominal Press", "Rotary Torso"],
      "Legs and Core": ["Squats", "Lunges", "Leg Press", "Leg Extension", "Leg Curls", "Calf Raises", "Abdominal Press", "Rotary Torso"],
      "Cycling Intervals + Incline Walking": ["Cycling", "Incline Walking"],
      "Cycling Intervals + Core Burn": ["Cycling", "Abdominal Press", "Rotary Torso", "Plank", "Mountain Climbers", "Leg Raises"],
      "Treadmill Intervals": ["Treadmill Run"],
      "Upper Body + Incline Walking": ["Bench Press", "Chest Press", "Shoulder Press", "Lat Pull Down", "Lat Pull Overs", "Triceps Press", "Barbell Curls", "Abdominal Press", "Incline Walking"],
      "Cycling Intervals + Core": ["Cycling", "Abdominal Press", "Rotary Torso", "Plank", "Mountain Climbers", "Leg Raises"],
      "Stair Climbers + Sled Push Circuit": ["Stair Climbers"]
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
});
