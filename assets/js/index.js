const handleClickEvent = () => {
  window.location.href = "/individual.html";
};
const individual = document.querySelector("#individual");
individual.addEventListener("click", handleClickEvent);

const logo = document.querySelector("#logo");
logo.addEventListener("click", () => (window.location.href = "/"));

const a = "yay";
