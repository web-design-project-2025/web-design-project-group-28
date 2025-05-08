/*let userData = [];

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

const full = document.getElementById("full");
const back = document.getElementById("spine");
const chest = document.getElementById("chest");
const abs = document.getElementById("abs");
const shoulders = document.getElementById("shoulders");
const legs = document.getElementById("legs");
const arms = document.getElementById("arms");

back.addEventListener("click", () => {
  userData.forEach((e) => {
    e.part = "back";
    console.log(e.part);
  });
  localStorage.setItem("data", JSON.stringify(userData));
});

chest.addEventListener("click", () => {
  userData.forEach((e) => {
    e.part = "chest";
    console.log(e.part);
  });
  localStorage.setItem("data", JSON.stringify(userData));
});

abs.addEventListener("click", () => {
  userData.forEach((e) => {
    e.part = "abs";
    console.log(e.part);
  });
  localStorage.setItem("data", JSON.stringify(userData));
});

shoulders.addEventListener("click", () => {
  userData.forEach((e) => {
    e.part = "shoulders";
    console.log(e.part);
  });
  localStorage.setItem("data", JSON.stringify(userData));
});

legs.addEventListener("click", () => {
  userData.forEach((e) => {
    e.part = "legs";
    console.log(e.part);
  });
  localStorage.setItem("data", JSON.stringify(userData));
});

arms.addEventListener("click", () => {
  userData.forEach((e) => {
    e.part = "arms";
    console.log(e.part);
  });
  localStorage.setItem("data", JSON.stringify(userData));
});

full.addEventListener("click", () => {
  userData.forEach((e) => {
    e.part = "full";
    console.log(e.part);
  });
  localStorage.setItem("data", JSON.stringify(userData));
});
*/

let userData = [];

// Load existing user data from localStorage
function loadUserData() {
  try {
    const response = JSON.parse(localStorage.getItem("data"));
    if (response) {
      userData = response;
    } else {
      userData = [{}]; // default if nothing exists
    }

    // If there are selected parts, mark them visually
    const selectedParts = userData[0]?.parts || [];
    selectedParts.forEach((part) => {
      const button = document.getElementById(part);
      if (button) {
        button.classList.add("selected");
      }
    });
  } catch (error) {
    console.error("Error loading user data:", error);
    userData = [{}];
  }
}

loadUserData();

// Handle button selection toggle
const partButtons = document.querySelectorAll(".bodyparts button, #full");

partButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const part = button.id;

    // Initialize parts array if not present
    if (!userData[0].parts) {
      userData[0].parts = [];
    }

    const parts = userData[0].parts;
    const index = parts.indexOf(part);

    // Toggle selection
    if (index === -1) {
      parts.push(part);
      button.classList.add("selected");
    } else {
      parts.splice(index, 1);
      button.classList.remove("selected");
    }

    // Save updated selections
    localStorage.setItem("data", JSON.stringify(userData));
  });
});
