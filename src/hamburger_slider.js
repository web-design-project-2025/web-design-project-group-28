const currentPage = window.location.pathname;

function updateHeader() {
  const header = document.getElementById("inserter"); //gets the header

  const isMobile = window.innerWidth < 800; // checks if the screen is small

  //checks what page the user is on

  let currentMessage = "";

  if (currentPage === "/web-design-project-group-28/gender.html") {
    currentMessage = "What do you identify as?";
  }

  if (currentPage === "/web-design-project-group-28/weight.html") {
    currentMessage = "What is your weight?";
  }

  if (currentPage === "/web-design-project-group-28/height.html") {
    currentMessage = "How tall are you?";
  }

  if (currentPage === "/web-design-project-group-28/age.html") {
    currentMessage = "How old are you?";
  }

  if (currentPage === "/web-design-project-group-28/part.html") {
    currentMessage = "What area would like to focus?";
  }

  //HTML for normal header
  const normalHTML = `          
      <section class="question-titles">
        <a href="index.html">
          <img src="img/logo_sweatzone.svg" alt="logo of sweatzone"
        /></a>

        <h2>${currentMessage}</h2>

        <a href="profile.html"
          ><img src="img/profile_icon.svg" alt="profile icon"
        /></a>
      </section>
    `;

  //HTML for hamburger button "three lines"
  const hamburgerHTML = `    
           <div class="hamburger-slider-container">
             <h2 class="message-middle">${currentMessage}</h2>
      <button class="right-burger" id="toggle"><div class="three-lines">☰</div></button>
    </div>
  
    `;
  //HTML for the dropdown menu
  const smallMenu = `      <ul>
            <a href="index.html"><li>Home</li></a>
            <a href="about.html"><li>About us</li></a>
            <a href="explore.html"><li>Explore</li></a>
            <a href="profile.html"><li>Profile</li></a>
          </ul>`;

  let menuVisible = true;

  // changes the the header based on screen size
  if (isMobile) {
    header.innerHTML = hamburgerHTML;

    //takes in the button for the hamburger menu
    const hamburgerMenu = document.getElementById("hamburger");
    const threeLines = document.getElementById("toggle");

    //makes the menu toggleble
    threeLines.addEventListener("click", (e) => {
      if (menuVisible === false) {
        hamburgerMenu.innerHTML = "";
      } else {
        hamburgerMenu.innerHTML = smallMenu;
      }

      menuVisible = !menuVisible;
    });
  } else {
    header.innerHTML = normalHTML;
  }
}

updateHeader();

//updates when the user changes screen size
window.addEventListener("resize", updateHeader);
