function updateHeader() {
  const header = document.getElementById("inserter"); //gets the header

  const isMobile = window.innerWidth < 600; // checks if the screen is small

  //HTML for normal header
  const normalHTML = `      <section class="header-titles">
            <img src="img/logo_sweatzone.svg" alt="logo of sweatzone" />
            <a href="index.html"> <h2>Home</h2></a>
    
            <a href="about.html"> <h2>About us</h2></a>
            <a href="explore.html"> <h2>Explore</h2></a>
          </section>
    
          <section class="header-profile">
            <a class="a-profile" href="profile.html">
              <img src="../img/profile_icon.svg" alt="profile icon"
            /></a>
          </section>`;

  //HTML for hamburger button "three lines"
  const hamburgerHTML = `    
           <div class="three-container">
      <button id="toggle"><div class="three-lines">☰</div></button>
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
