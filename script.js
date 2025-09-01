// Toggle hamburger menu
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Change header color on scroll
const header = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
