/*
let userData = [];
async function loadUserData() {
  try {
    const response = await JSON.parse(localStorage.getItem("data"));
    userData = response;
    console.log("fungerar", userData);
  } catch (error) {
    console.log("error", error);
  }
}

loadUserData();

const day1 = document.getElementById("1");
const day2 = document.getElementById("2");
const day3 = document.getElementById("3");
const day4 = document.getElementById("4");
const day5 = document.getElementById("5");
const day6 = document.getElementById("6");
const day7 = document.getElementById("7");

//example how we will get the right workoutplan for the goal selected

userData.forEach((e) => {
  if (e.gender === false) {
    day1.innerHTML = `<h1>Day 1</h1>
        <p>Build muscle</p>`;
  } else {
    `<h1>Day 1</h1>
        <p>Dont build muscle</p>`;
  }
});
*/

document.addEventListener("DOMContentLoaded", () => {
  const goal = (localStorage.getItem("selectedGoal") || "build muscle").toLowerCase();
  const days = localStorage.getItem("daysPerWeek") || "6";

  const plans = {
    "build muscle": {
      "6": [
        "Chest and Triceps",
        "Shoulders and Core",
        "Back and Biceps",
        "Legs and Core",
        "Rest and Recoup",
        "Cardio",
        "Full Body"
      ]
    },
    "lose weight": {
      "6": [
        "Lower Body + Cardio",
        "Push Day + Core",
        "Lower Body + HIIT",
        "Pull Day + Core",
        "Rest Day",
        "Full Body + Light Cardio",
        "Metabollic Circuit"
      ]
    },
    "increase stamina": {
      "6": [
        "Full Body",
        "Treadmill Intervals",
        "Cycling Intervals + Core",
        "Incline Walking",
        "Rest Day",
        "Treadmill Jog Intervals",
        "Stair Climber + Sled Push Circuit"
      ]
    },
    "just stay fit": {
      "6": [
        "Chest and Triceps",
        "Shoulders and Core",
        "Back and Biceps",
        "Legs and Core",
        "Rest and Recoup",
        "Cardio",
        "Full Body"
      ]
    }
  };

  const planContainer = document.getElementById("plan-container");

  const weeklyPlan = plans[goal]?.[days];

  if (!weeklyPlan) {
    planContainer.innerHTML = `<p>No workout plan found for goal <strong>${goal}</strong> with <strong>${days}</strong> days/week.</p>`;
    return;
  }

  weeklyPlan.forEach((activity, index) => {
    const dayNum = index + 1;

    const card = document.createElement("div");
    card.classList.add("plan-card");

    card.innerHTML = `
      <h3>Day ${dayNum}</h3>
      <p>${activity}</p>
      <a href="plan.html"><button>View Plan</button></a>
    `;

    planContainer.appendChild(card);
  });
});
