const down = document.getElementById("isResponsive");
const up = document.getElementById("arrows");
const isMobile = window.innerWidth < 600;

if (isMobile) {
  down.innerHTML = `<a href="index.html">
          <img class="left" src="img/arrow_left.svg" alt=""
        /></a>
        <a href="weight.html">
          <img class="right" src="img/arrow_right.svg" alt=""
        /></a>`;

  up.innerHTML = "";
} else {
  up.innerHTML = `<a href="index.html">
      <img class="left" src="img/arrow_left.svg" alt=""
    /></a>
    <a href="weight.html">
      <img class="right" src="img/arrow_right.svg" alt=""
    /></a>`;

  down.innerHTML = "";
}
