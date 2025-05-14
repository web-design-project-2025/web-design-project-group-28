document.addEventListener("DOMContentLoaded", () => {
  try {
    const storedData = localStorage.getItem("data");
    if (!storedData) throw new Error("No user data found");

    const userData = JSON.parse(storedData);

    if (!Array.isArray(userData) || userData.length === 0) {
      throw new Error("User data format invalid");
    }

    const user = userData[0];

    const dataMap = {
      "weight-output": `${user.weight} kg`,
      "height-output": `${user.height} cm`,
      "age-output": `${user.age} years`,
      "gender-output": user.gender === true ? "Male" : "Female",
      "focus-output": Array.isArray(user.parts)
        ? user.parts.join(", ")
        : "None",
    };

    const selectedGoal = localStorage.getItem("selectedGoal");
    const daysPerWeek = localStorage.getItem("daysPerWeek");

    if (selectedGoal) {
      dataMap["goal-output"] = selectedGoal;
    }

    if (daysPerWeek) {
      dataMap["days-output"] = `${daysPerWeek} times per week`;
    }

    for (const [id, value] of Object.entries(dataMap)) {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    }

    console.log("Displayed all user data:", {
      ...user,
      selectedGoal,
      daysPerWeek,
    });
  } catch (error) {
    console.error("Error displaying user data:", error);
  }
});
