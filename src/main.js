const man = document.getElementById("man-button");
const woman = document.getElementById("woman-button");

let userData = [];

async function loadUserData() {
  try {
    const response = await fetch("json_files/user.json");
    const data = await response.json();
    userData = data;
  } catch (error) {
    console.error("Error", error);
  }
}

loadUserData();

console.log(userData);

function arrayUser() {}

man.addEventListener("click", (e) => {
  if (userData.gender === true || userData.gender === undefined) {
    userData[0].gender = false;
    console.log("Man", userData);
    localStorage.setItem("data", JSON.stringify(userData));
  }
});

woman.addEventListener("click", (e) => {
  if (userData.gender === false || userData.gender === undefined) {
    userData[0].gender = true;
    console.log("kvinna", userData);
    localStorage.setItem("data", JSON.stringify(userData));
  }
});
