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
