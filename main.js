//------create function slide-bar(hidding & showing)
let menuIcon = document.getElementById("menu-icon");
let slideBar = document.getElementById("slide-bar");
function showMenu() {
  menuIcon.classList.toggle("fa-times");
  slideBar.classList.toggle("active");
}
//<hide the sidebar when clicking anywhere outside of it>
document.addEventListener("click", function (event) {
  if (!slideBar.contains(event.target) && !menuIcon.contains(event.target)) {
    if (slideBar.classList.contains("active")) {
      slideBar.classList.remove("active");
      menuIcon.classList.remove("fa-times");
    }
  }
});
// create a function to add background color to the header when i scroll down
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 120);
});

// create function to display and hiding description paragraph

// Select all toggle buttons
const descriptionBtn = document.querySelectorAll(".description-btn");

// Add click event listener to each button
descriptionBtn.forEach((button) => {
  button.addEventListener("click", function () {
    // Get the associated description element in the same card
    const descriptionParagraph = this.parentElement.querySelector(
      ".description-paragraph"
    );

    // Toggle the visibility
    descriptionParagraph.classList.toggle("show");
    // if (descriptionParagraph.style.display === "none" || descriptionParagraph.style.display === "") {
    //   descriptionParagraph.style.display = "block";
    // } else {
    //   descriptionParagraph.style.display = "none";
    // }
  });
});

// create circles for left-skills
const circles = document.querySelectorAll(".circle");

circles.forEach(elem => {
  var dots = elem.getAttribute("data-dots");
  var marked = elem.getAttribute("data-percent");
  var percent = Math.floor(dots * marked / 100); // Calculate the number of marked points
  var points = "";
  var rotate = 360 / dots; // Rotation for each point

  for (let i = 0; i < dots; i++) {
    let isMarked = i < percent ? 'marked' : ''; // Mark the appropriate points
    points += `<div class="points ${isMarked}" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }

  elem.innerHTML = points;
});

