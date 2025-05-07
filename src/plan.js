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
  