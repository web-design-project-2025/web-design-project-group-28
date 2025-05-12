/*document.addEventListener("DOMContentLoaded", () => {
    const workoutTitle = localStorage.getItem("selectedWorkoutTitle") || "Chest and Triceps";
    const titleElement = document.getElementById("workout-name");
    const exerciseContainer = document.getElementById("exercises");
  
    titleElement.textContent = workoutTitle;
  
    fetch("../data/workout_templates.json")
      .then((res) => res.json())
      .then((data) => {
        const exercises = data[workoutTitle];
        if (!exercises) {
          exerciseContainer.innerHTML = "<p>No exercises found for this workout.</p>";
          return;
        }
  
        exercises.forEach((exercise) => {
          const card = document.createElement("div");
          card.className = "exercise-card";
  
          card.innerHTML = `
            <h3>${exercise.name}</h3>
            <p>${exercise.description}</p>
            <p><strong>Sets:</strong> ${exercise.sets}</p>
            <p><strong>Reps:</strong> ${exercise.reps}</p>
            <img src="${exercise.image || 'https://via.placeholder.com/300'}" alt="${exercise.name}" />
          `;
  
          exerciseContainer.appendChild(card);
        });
      })
      .catch((err) => {
        console.error("Error loading workout data:", err);
        exerciseContainer.innerHTML = "<p>Error loading exercises.</p>";
      });

      // Edit Plan button functionality
  const editBtn = document.getElementById("edit-plan-btn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const goal = localStorage.getItem("selectedGoal");
      const days = localStorage.getItem("daysPerWeek");

      if (!goal || !days || !workoutTitle) {
        alert("Missing data. Cannot proceed to edit.");
        return;
      }

      // All necessary data already in localStorage
      window.location.href = "edit_plan.html";
    });
  }
});
*/

document.addEventListener("DOMContentLoaded", () => {
  const workoutTitle = localStorage.getItem("selectedWorkoutTitle") || "Chest and Triceps";
  const goal = localStorage.getItem("selectedGoal");
  const days = localStorage.getItem("daysPerWeek");
  const titleElement = document.getElementById("workout-name");
  const exerciseContainer = document.getElementById("exercises");

  titleElement.textContent = workoutTitle;

  // Custom plan key
  const customKey = `customPlan-${goal}-${days}-${workoutTitle}`;
  const customPlan = localStorage.getItem(customKey);

  if (customPlan) {
    // Load and render custom exercises
    const exercises = JSON.parse(customPlan);
    if (exercises.length === 0) {
      exerciseContainer.innerHTML = "<p>No exercises found in your custom plan.</p>";
    } else {
      renderSimpleExerciseList(exercises);
    }
  } else {
    // Fallback to default template data
    fetch("../data/workout_templates.json")
      .then((res) => res.json())
      .then((data) => {
        const exercises = data[workoutTitle];
        if (!exercises) {
          exerciseContainer.innerHTML = "<p>No exercises found for this workout.</p>";
          return;
        }
        renderDetailedExerciseCards(exercises);
      })
      .catch((err) => {
        console.error("Error loading workout data:", err);
        exerciseContainer.innerHTML = "<p>Error loading exercises.</p>";
      });
  }

  // Function to render custom (simple text-only) exercise list
  function renderSimpleExerciseList(exercises) {
    exerciseContainer.innerHTML = "";
    exercises.forEach((name) => {
      const card = document.createElement("div");
      card.className = "exercise-card";
      card.innerHTML = `<h3>${name}</h3>`;
      exerciseContainer.appendChild(card);
    });
  }

  // Function to render default detailed cards
  function renderDetailedExerciseCards(exercises) {
    exerciseContainer.innerHTML = "";
    exercises.forEach((exercise) => {
      const card = document.createElement("div");
      card.className = "exercise-card";
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const encodedName = encodeURIComponent(exercise.name);
        window.location.href = `how_to_guide.html?exercise=${encodedName}`;
      });

      card.innerHTML = `
        <h3>${exercise.name}</h3>
        <p>${exercise.description}</p>
        <p><strong>Sets:</strong> ${exercise.sets}</p>
        <p><strong>Reps:</strong> ${exercise.reps}</p>
        <img src="${exercise.image || 'https://via.placeholder.com/300'}" alt="${exercise.name}" />
      `;

      exerciseContainer.appendChild(card);
    });
  }

  // Edit Plan button functionality
  const editBtn = document.getElementById("edit-plan-btn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (!goal || !days || !workoutTitle) {
        alert("Missing data. Cannot proceed to edit.");
        return;
      }
      window.location.href = "edit_plan.html";
    });
  }
});

  