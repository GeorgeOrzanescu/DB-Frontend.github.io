const modal = document.getElementById("btn-add");
const target = document.getElementById("modal");

console.log(modal);
console.log(target);
modal.addEventListener("click", function (e) {
  e.preventDefault();
  target.classList.remove("no-display");
});
