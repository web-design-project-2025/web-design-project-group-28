/*
document.addEventListener("DOMContentLoaded", () => {
    const selectedGoal = localStorage.getItem("selectedGoal");
    const daysPerWeek = localStorage.getItem("daysPerWeek");
    const planContainer = document.getElementById("plan-container");
  
    if (!selectedGoal || !daysPerWeek) {
      planContainer.innerHTML = "<p>Please go back and select your goal and training days.</p>";
      return;
    }
  
    fetch("data/workout_plans.json")
      .then(response => response.json())
      .then(plans => {
        const goalPlan = plans[selectedGoal];
        const weeklyPlan = goalPlan?.[daysPerWeek];
  
        if (!weeklyPlan) {
          planContainer.innerHTML = "<p>No plan found for your selection.</p>";
          return;
        }
  
        // Render the plan
        planContainer.innerHTML = `<h2>Goal: ${selectedGoal.replace("_", " ")}</h2>
                                    <h3>${daysPerWeek} Days/Week Plan</h3>`;
  
        const list = document.createElement("ul");
        weeklyPlan.forEach((day, index) => {
          const li = document.createElement("li");
          li.textContent = `Day ${index + 1}: ${day}`;
          list.appendChild(li);
        });
  
        planContainer.appendChild(list);
      })
      .catch(error => {
        console.error("Error loading plan:", error);
        planContainer.innerHTML = "<p>Failed to load workout plan.</p>";
      });
  });

*/
/*
document.addEventListener("DOMContentLoaded", () => {
  const selectedGoal = localStorage.getItem("selectedGoal");
  const daysPerWeek = localStorage.getItem("daysPerWeek");
  const planContainer = document.getElementById("plan-container");

  if (!selectedGoal || !daysPerWeek) {
    planContainer.innerHTML =
      "<p>Please go back and select your goal and training days.</p>";
    return;
  }

  // Normalize keys to match JSON keys
  const goalKey = selectedGoal.trim().toLowerCase();

  fetch("../data/workout_plans.json")
    .then((response) => response.json())
    .then((plans) => {
      const goalPlan = plans[goalKey];
      const weeklyPlan = goalPlan?.[daysPerWeek];

      if (!weeklyPlan) {
        planContainer.innerHTML = "<p>No plan found for your selection.</p>";
        return;
      }

      planContainer.innerHTML = `
          <h2>Goal: ${selectedGoal}</h2>
          <h3>${daysPerWeek} Days/Week Plan</h3>
          <ul>
          ${weeklyPlan
            .map(
              (day, index) =>
                `<li>
                <strong>Day ${index + 1}:</strong> ${day}
              </li>`
            )
            .join("")}
          </ul>
        `;
    })
    .catch((error) => {
      console.error("Error loading plan:", error);
      planContainer.innerHTML = "<p>Failed to load workout plan.</p>";
    });
});
*/
/*
document.addEventListener("DOMContentLoaded", () => {
  const selectedGoal = localStorage.getItem("selectedGoal");
  const daysPerWeek = localStorage.getItem("daysPerWeek");
  const planContainer = document.getElementById("plan-container");

  if (!selectedGoal || !daysPerWeek) {
    planContainer.innerHTML = "<p>Please go back and select your goal and training days.</p>";
    return;
  }

  // Get body parts from localStorage "data"
  let selectedParts = [];
  try {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data && data[0] && Array.isArray(data[0].parts)) {
      selectedParts = data[0].parts.map(part => part.toLowerCase());
    }
  } catch (error) {
    console.error("Failed to parse selected parts:", error);
  }

  const goalKey = selectedGoal.trim().toLowerCase();

  fetch("../data/workout_plans.json")
    .then(response => response.json())
    .then(plans => {
      const goalPlan = plans[goalKey];
      const weeklyPlan = goalPlan?.[daysPerWeek];

      if (!weeklyPlan) {
        planContainer.innerHTML = "<p>No plan found for your selection.</p>";
        return;
      }

      // If no body part selected, show full plan
      let finalPlan = weeklyPlan;

      if (selectedParts.length > 0) {
        finalPlan = weeklyPlan.filter(workout => {
          return selectedParts.some(part =>
            workout.toLowerCase().includes(part)
          );
        });
      }

      if (finalPlan.length === 0) {
        planContainer.innerHTML = "<p>No workouts match the selected body parts.</p>";
        return;
      }

      planContainer.innerHTML = `
        <h2>Goal: ${selectedGoal}</h2>
        <h3>${daysPerWeek} Days/Week Plan</h3>
        <ul>
          ${finalPlan.map((day, index) => `<li><strong>Day ${index + 1}:</strong> ${day}</li>`).join("")}
        </ul>
      `;
    })
    .catch(error => {
      console.error("Error loading plan:", error);
      planContainer.innerHTML = "<p>Failed to load workout plan.</p>";
    });
});
*/
/*
document.addEventListener("DOMContentLoaded", () => {
    const selectedGoal = localStorage.getItem("selectedGoal");
    const daysPerWeek = localStorage.getItem("daysPerWeek");
    const planContainer = document.getElementById("plan-container");
  
    if (!selectedGoal || !daysPerWeek) {
      planContainer.innerHTML = "<p>Please go back and select your goal and training days.</p>";
      return;
    }
  
    // Normalize keys to match JSON keys
    const goalKey = selectedGoal.trim().toLowerCase();
  
    fetch("../data/workout_plans.json")
      .then(response => response.json())
      .then(plans => {
        const goalPlan = plans[goalKey];
        const weeklyPlan = goalPlan?.[daysPerWeek];
  
        if (!weeklyPlan) {
          planContainer.innerHTML = "<p>No plan found for your selection.</p>";
          return;
        }
  
        // Create interactive list
        const listItems = weeklyPlan.map((dayTitle, index) => {
          return `
            <li>
              <a href="specific_day_plan.html" class="day-link" data-title="${dayTitle}">
                <strong>Day ${index + 1}:</strong> ${dayTitle}
              </a>
            </li>
          `;
        }).join("");
  
        planContainer.innerHTML = `
          <h2>Goal: ${selectedGoal}</h2>
          <h3>${daysPerWeek} Days/Week Plan</h3>
          <ul>${listItems}</ul>
        `;
  
        // Attach event listeners to each link
        document.querySelectorAll(".day-link").forEach(link => {
          link.addEventListener("click", (e) => {
            const title = e.currentTarget.dataset.title;
            localStorage.setItem("selectedWorkoutTitle", title);
          });
        });
      })
      .catch(error => {
        console.error("Error loading plan:", error);
        planContainer.innerHTML = "<p>Failed to load workout plan.</p>";
      });
  });
*/
  document.addEventListener("DOMContentLoaded", () => {
  const selectedGoal = localStorage.getItem("selectedGoal");
  const daysPerWeek = localStorage.getItem("daysPerWeek");
  const planContainer = document.getElementById("plan-container");

  if (!selectedGoal || !daysPerWeek) {
    planContainer.innerHTML = "<p>Please go back and select your goal and training days.</p>";
    return;
  }

  const goalKey = selectedGoal.trim().toLowerCase();

  fetch("../data/workout_plans.json")
    .then(response => response.json())
    .then(plans => {
      const goalPlan = plans[goalKey];
      const weeklyPlan = goalPlan?.[daysPerWeek];

      if (!weeklyPlan) {
        planContainer.innerHTML = "<p>No plan found for your selection.</p>";
        return;
      }

      // Render cards
      planContainer.innerHTML = weeklyPlan.map((dayTitle, index) => {
        return `
          <div class="plan-card">
            <div class="card-content">
              <h3>Day ${index + 1}</h3>
              <p>${dayTitle}</p>
            </div>
            <button class="start-btn" data-title="${dayTitle}">Start</button>
          </div>
        `;
      }).join("");

      // Attach event listeners
      document.querySelectorAll(".start-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const title = e.currentTarget.dataset.title;
          localStorage.setItem("selectedWorkoutTitle", title);
          window.location.href = "specific_day_plan.html";
        });
      });
    })
    .catch(error => {
      console.error("Error loading plan:", error);
      planContainer.innerHTML = "<p>Failed to load workout plan.</p>";
    });
});
