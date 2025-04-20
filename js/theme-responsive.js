let body = document.querySelector("body");
let dark = document.querySelector("span.material-symbols-outlined");

// dark.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");
//   body.classList.contains("dark-mode")
//     ? (dark.innerHTML = "light_mode")
//     : (dark.innerHTML = "dark_mode");
// });

// Check localStorage for dark mode preference on page load
if (localStorage.getItem("dark-mode") === "enabled") {
  body.classList.add("dark-mode");
  dark.innerHTML = "light_mode";
}

// Toggle dark mode and save preference to localStorage
dark.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
    dark.innerHTML = "light_mode";
  } else {
    localStorage.setItem("dark-mode", "disabled");
    dark.innerHTML = "dark_mode";
  }
});
