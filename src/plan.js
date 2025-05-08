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
  
        planContainer.innerHTML = `
          <h2>Goal: ${selectedGoal}</h2>
          <h3>${daysPerWeek} Days/Week Plan</h3>
          <ul>
            ${weeklyPlan.map((day, index) => `<li><strong>Day ${index + 1}:</strong> ${day}</li>`).join("")}
          </ul>
        `;
      })
      .catch(error => {
        console.error("Error loading plan:", error);
        planContainer.innerHTML = "<p>Failed to load workout plan.</p>";
      });
  });

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