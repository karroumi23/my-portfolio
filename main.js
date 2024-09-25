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