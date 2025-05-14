/*
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

// Function to render custom (simple text-only) exercise list
function renderSimpleExerciseList(exercises) {
  exerciseContainer.innerHTML = "";
  exercises.forEach((name) => {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const encodedName = encodeURIComponent(name);
      window.location.href = `how_to_guide.html?exercise=${encodedName}`;
    });

    card.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Sets:</strong> -</p>
      <p><strong>Reps:</strong> -</p>
      <img src="https://via.placeholder.com/300" alt="${name}" />
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
*/
/*
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
    const exercises = JSON.parse(customPlan);
    if (exercises.length === 0) {
      exerciseContainer.innerHTML = "<p>No exercises found in your custom plan.</p>";
    } else {
      // Load template to backfill missing sets/reps
      fetch("../data/workout_templates.json")
        .then(res => res.json())
        .then(templateData => {
          renderSimpleExerciseList(exercises, templateData);
        })
        .catch(err => {
          console.error("Error loading template data:", err);
          renderSimpleExerciseList(exercises);
        });
    }
  } else {
    // Fallback to default template
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

  // ✅ Render custom plan cards (with fallback for sets/reps)
  function renderSimpleExerciseList(exercises, templateData = {}) {
    exerciseContainer.innerHTML = "";

    exercises.forEach((exercise) => {
      let name = "";
      let sets = "-";
      let reps = "-";

      if (typeof exercise === "string") {
        name = exercise;

        // Try to find sets/reps from templateData
        const template = (templateData[workoutTitle] || []).find(e => e.name === name);
        if (template) {
          sets = template.sets || "-";
          reps = template.reps || "-";
        }
      } else {
        name = exercise.name || "-";
        sets = exercise.sets || "-";
        reps = exercise.reps || "-";
      }

      const card = document.createElement("div");
      card.className = "exercise-card";
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const encodedName = encodeURIComponent(name);
        window.location.href = `how_to_guide.html?exercise=${encodedName}`;
      });

      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Sets:</strong> ${sets}</p>
        <p><strong>Reps:</strong> ${reps}</p>
        <img src="https://via.placeholder.com/300" alt="${name}" />
      `;

      exerciseContainer.appendChild(card);
    });
  }

  // Button to go to edit plan
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
        let exercises = data[workoutTitle];

        // Try case-insensitive fallback if exact match fails
        if (!exercises) {
          const fallbackKey = Object.keys(data).find(
            (key) => key.toLowerCase() === workoutTitle.toLowerCase()
          );
          exercises = data[fallbackKey];
        }

        if (!exercises) {
          console.warn("Workout title not found:", workoutTitle);
          console.warn("Available titles are:", Object.keys(data));
          exerciseContainer.innerHTML = `<p>No exercises found for "${workoutTitle}". Please check your plan data.</p>`;
          return;
        }

        renderDetailedExerciseCards(exercises);
      })
      .catch((err) => {
        console.error("Error loading workout data:", err);
        exerciseContainer.innerHTML = "<p>Error loading exercises.</p>";
      });
  }

  // Function to render default exercises with full detail
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
        <p>${exercise.description || "No description available."}</p>
        <p><strong>Sets:</strong> ${exercise.sets || "-"}</p>
        <p><strong>Reps:</strong> ${exercise.reps || "-"}</p>
        <img src="https://via.placeholder.com/300" alt="${exercise.name}" />
      `;
      exerciseContainer.appendChild(card);
    });
  }

  // Function to render custom exercises (name only) with sets/reps as dashes
  function renderSimpleExerciseList(exercises) {
    exerciseContainer.innerHTML = "";
    exercises.forEach((name) => {
      const card = document.createElement("div");
      card.className = "exercise-card";
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const encodedName = encodeURIComponent(name);
        window.location.href = `how_to_guide.html?exercise=${encodedName}`;
      });

      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Sets:</strong> 3</p>
        <p><strong>Reps:</strong> 8-12</p>
        <img src="https://via.placeholder.com/300" alt="${name}" />
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
    // Mobile nav toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
  });
});

  