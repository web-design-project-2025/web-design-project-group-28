document.addEventListener("DOMContentLoaded", () => {
  const workoutTitle =
    localStorage.getItem("selectedWorkoutTitle") || "Chest and Triceps";
  const goal = localStorage.getItem("selectedGoal");
  const days = localStorage.getItem("daysPerWeek");
  const titleElement = document.getElementById("workout-name");
  const exerciseContainer = document.getElementById("exercises");

  titleElement.textContent = workoutTitle;

  // Helper to generate image path based on exercise name
  function getImagePath(name) {
    const formattedName = name.toLowerCase().replace(/\s+/g, "_");
    return `exercise_images/${formattedName}.png`;
  }

  // Custom plan key
  const customKey = `customPlan-${goal}-${days}-${workoutTitle}`;
  const customPlan = localStorage.getItem(customKey);

  if (customPlan) {
    // Load and render custom exercises
    const exercises = JSON.parse(customPlan);
    if (exercises.length === 0) {
      exerciseContainer.innerHTML =
        "<p>No exercises found in your custom plan.</p>";
    } else {
      renderSimpleExerciseList(exercises);
    }
  } else {
    // Fallback to default template data
    fetch("data/workout_templates.json")
      .then((res) => res.json())
      .then((data) => {
        let exercises = data[workoutTitle];

        // Trying case-insensitive fallback if exact match fails
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
        <img src="${getImagePath(exercise.name)}" alt="${
        exercise.name
      }" onerror="this.onerror=null; this.src='https://via.placeholder.com/300'" />
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
        <img src="${getImagePath(
          name
        )}" alt="${name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300'" />
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
    mobileMenu.style.display =
      mobileMenu.style.display === "flex" ? "none" : "flex";
  });
});
