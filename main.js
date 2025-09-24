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




// lightbox to show img project slider 
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let images = [];
let currentIndex = 0;

// Open lightbox
document.querySelectorAll('.project-img').forEach(img => {
  img.addEventListener('click', () => {
    images = img.dataset.images.split(',');
    currentIndex = 0;
    openLightbox(images[currentIndex]);
  });
});

function openLightbox(src) {
  lightbox.style.display = 'block';
  lightboxImg.src = src;
}

// Close
closeBtn.onclick = () => {
  lightbox.style.display = 'none';
};

// Next/Prev
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
};

// Close on outside click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});


