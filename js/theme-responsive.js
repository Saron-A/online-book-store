let body = document.querySelector("body");
let dark = document.querySelector("span.material-symbols-outlined");

dark.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.contains("dark-mode")
    ? (dark.innerHTML = "light_mode")
    : (dark.innerHTML = "dark_mode");
});
