//------create function slide-bar(hidding & showing)
let menuIcon = document.getElementById("menu-icon");
let slideBar = document.getElementById("slide-bar");
function showMenu() {
  menuIcon.classList.toggle("fa-times");
  slideBar.classList.toggle("active");
}