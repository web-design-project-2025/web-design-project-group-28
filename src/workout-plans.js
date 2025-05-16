document.addEventListener("DOMContentLoaded", () => {
  const goal = (
    localStorage.getItem("selectedGoal") || "build muscle"
  ).toLowerCase();
  const days = localStorage.getItem("daysPerWeek") || "6";
  const planContainer = document.getElementById("plan-container");

  fetch("data/workout_exercises.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load workout data.");
      }
      return response.json();
    })
    .then((data) => {
      const goalPlans = data[goal];
      if (!goalPlans) {
        planContainer.innerHTML = `<p>No plans available for goal: <strong>${goal}</strong>.</p>`;
        return;
      }

      const dailyPlans = goalPlans[days];
      if (!dailyPlans || dailyPlans.length === 0) {
        planContainer.innerHTML = `<p>No plans available for <strong>${goal}</strong> with <strong>${days}</strong> days/week.</p>`;
        return;
      }

      // Sort by day number (in case they are not in order)
      dailyPlans.sort((a, b) => a.day - b.day);

      dailyPlans.forEach((plan) => {
        const card = document.createElement("div");
        card.classList.add("plan-card");
        card.innerHTML = `
          <h3>Day ${plan.day}: ${plan.title}</h3>
          <p>${plan.description}</p>
        `;
        planContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading workout plan:", error);
      planContainer.innerHTML = `<p>There was an error loading your workout plan. Please try again later.</p>`;
    });
});
