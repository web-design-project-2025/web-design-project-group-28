async function loadUserData() {
  try {
    const response = await JSON.parse(localStorage.getItem("data"));
    userData = response;
    console.log("fungerar", userData);
  } catch (error) {
    console.log("error", error);
  }
}

const back = document.getElementById("spine");
const chest = document.getElementById("chest");
const abs = document.getElementById("abs");
const shoulders = document.getElementById("shoulders");
const legs = document.getElementById("legs");
const arms = document.getElementById("arms");

back.addEventListener("click", () => {
  console.log("back");
});

chest.addEventListener("click", () => {
  console.log("back");
});

abs.addEventListener("click", () => {
  console.log("abs");
});

shoulders.addEventListener("click", () => {
  console.log("shoulders");
});

legs.addEventListener("click", () => {
  console.log("abs");
});

arms.addEventListener("click", () => {
  console.log("arms");
});
