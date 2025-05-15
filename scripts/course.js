document.addEventListener("DOMContentLoaded", () => {
  const btnAll = document.getElementById("all-certificate");
  const btnCSE = document.getElementById("cse-certificate");
  const btnWDD = document.getElementById("wdd-certificate");

  const certificates = document.querySelectorAll(".certificate-list p");

  function showAll() {
    certificates.forEach(p => p.style.display = "inline-block");
  }

  function showCSE() {
    certificates.forEach(p => {
      if (p.textContent.includes("CSE")) {
        p.style.display = "inline-block";
      } else {
        p.style.display = "none";
      }
    });
  }

  function showWDD() {
    certificates.forEach(p => {
      if (p.textContent.includes("WDD")) {
        p.style.display = "inline-block";
      } else {
        p.style.display = "none";
      }
    });
  }

  btnAll.addEventListener("click", showAll);
  btnCSE.addEventListener("click", showCSE);
  btnWDD.addEventListener("click", showWDD);
});