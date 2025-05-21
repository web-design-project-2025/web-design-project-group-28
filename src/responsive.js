function flipArrows() {
  const down = document.getElementById("isResponsive");
  const up = document.getElementById("arrows");
  const currentPage = window.location.pathname.split("/").pop();
  console.log(currentPage);
  const isMobile = window.innerWidth < 600;

  //arrows html

  let arrowhtml = `<a href="index.html"> 
        <img class="left" src="img/arrow_left.svg" alt=""
      /></a>
      <a href="weight.html">
        <img class="right" src="img/arrow_right.svg" alt=""
      /></a>`;

  function checkPage() {
    // checks what page the user is on and changes the arrows anchor tags
    if (currentPage === "weight.html") {
      arrowhtml = `<a href="gender.html">
      <img class="left" src="img/arrow_left.svg" alt=""
    /></a>
    <a href="height.html">
      <img class="right" src="img/arrow_right.svg" alt=""
    /></a>`;
    }

    if (currentPage === "height.html") {
      arrowhtml = `<a href="weight.html">
        <img class="left" src="img/arrow_left.svg" alt=""
      /></a>
      <a href="age.html">
        <img class="right" src="img/arrow_right.svg" alt=""
      /></a>`;
    }

    if (currentPage === "age.html") {
      arrowhtml = `<a href="height.html">
          <img class="left" src="img/arrow_left.svg" alt=""
        /></a>
        <a href="part.html">
          <img class="right" src="img/arrow_right.svg" alt=""
        /></a>`;
    }

    if (currentPage === "part.html") {
      arrowhtml = `<a href="age.html">
          <img class="left" src="img/arrow_left.svg" alt=""
        /></a>
        <a href="goal.html">
          <img class="right" src="img/arrow_right.svg" alt=""
        /></a>`;
    }

    if (currentPage === "goal.html") {
      arrowhtml = `<a href="part.html">
          <img class="left" src="img/arrow_left.svg" alt=""
        /></a>
        <a href="day_selction.html">
          <img class="right" src="img/arrow_right.svg" alt=""
        /></a>`;
    }
  }

  checkPage();

  //changes the arrows location if the screen is small enough

  if (isMobile) {
    down.innerHTML = arrowhtml;

    up.innerHTML = "";
  } else {
    up.innerHTML = arrowhtml;

    down.innerHTML = "";
  }
}

flipArrows();

window.addEventListener("resize", flipArrows);
