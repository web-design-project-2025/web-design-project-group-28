document.addEventListener("DOMContentLoaded", () => {
  const selectedGoal = localStorage.getItem("selectedGoal");
  const daysPerWeek = localStorage.getItem("daysPerWeek");
  const planContainer = document.getElementById("plan-container");

  if (!selectedGoal || !daysPerWeek) {
    planContainer.innerHTML =
      "<p>Please go back and select your goal and training days.</p>";
    return;
  }

  const goalKey = selectedGoal.trim().toLowerCase();

  fetch("data/workout_plans.json")
    .then((response) => response.json())
    .then((plans) => {
      const goalPlan = plans[goalKey];
      const weeklyPlan = goalPlan?.[daysPerWeek];

      if (!weeklyPlan) {
        planContainer.innerHTML = "<p>No plan found for your selection.</p>";
        return;
      }

      // Render cards
      planContainer.innerHTML = weeklyPlan
        .map((dayTitle, index) => {
          return `
          <div class="plan-card">
            <div class="card-content">
              <h3>Day ${index + 1}</h3>
              <p>${dayTitle}</p>
            </div>
            <button class="start-btn" data-title="${dayTitle}">Start</button>
          </div>
        `;
        })
        .join("");

      // Attach event listeners
      document.querySelectorAll(".start-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const title = e.currentTarget.dataset.title;
          localStorage.setItem("selectedWorkoutTitle", title);
          window.location.href = "specific_day_plan.html";
        });
      });
    })
    .catch((error) => {
      console.error("Error loading plan:", error);
      planContainer.innerHTML = "<p>Failed to load workout plan.</p>";
    });

  // Mobile nav toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.style.display =
      mobileMenu.style.display === "flex" ? "none" : "flex";
  });
});
