document.addEventListener("DOMContentLoaded", () => {
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
  });
  