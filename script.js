function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

window.addEventListener("scroll", function() {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.remove("transparent");
    header.classList.add("solid");
  } else {
    header.classList.remove("solid");
    header.classList.add("transparent");
  }
});
