// MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const dropdown = document.getElementById("dropdown-menu");

menuBtn.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
});

// CLOSE MENU WHEN CLICKING A LINK
dropdown.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    dropdown.style.display = "none";
  });
});

// CHANGE HEADER ON SCROLL
window.addEventListener("scroll", () => {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
