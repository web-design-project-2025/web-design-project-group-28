
document.addEventListener("DOMContentLoaded", () => {
  // Handle day-option selection (for training days page)
  const dayOptions = document.querySelectorAll(".day-option");

  dayOptions.forEach(option => {
    option.addEventListener("click", () => {
      dayOptions.forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");

      const selectedText = option.querySelector("strong").textContent;
      const selectedDays = parseInt(selectedText);                      // Extracting the number from "1 day / week"
      localStorage.setItem("daysPerWeek", selectedDays);
      console.log("Selected Days per Week:", selectedDays);
    });
  });

  // Handle goal-btn selection (for goal selection page)
  const goalButtons = document.querySelectorAll(".goal-btn");

  goalButtons.forEach(button => {
    button.addEventListener("click", () => {
      goalButtons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");

      const selectedGoal = button.getAttribute("data-goal");
      localStorage.setItem("selectedGoal", selectedGoal);
      console.log("Selected Goal:", selectedGoal);
    });
  });
});
