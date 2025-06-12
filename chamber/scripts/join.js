document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('join-form'); 
  form.addEventListener('submit', (event) => {
    event.preventDefault(); 
e = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phonenumber').value.trim();
    const orgname = document.getElementById('orgname').value.trim();

    const now = new Date();
    const timestamp = now.toLocaleString();


    localStorage.setItem('fname', fname);
    localStorage.setItem('lname', lname);
    localStorage.setItem('email', email);
    localStorage.setItem('phonenumber', phone);
    localStorage.setItem('orgname', orgname);
    localStorage.setItem('timestamp', timestamp);

    window.location.href = 'thankyou.html';
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modalLinks = document.querySelectorAll("#membership-levels a.button-style");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal .close");

  modalLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const modalId = link.getAttribute("href").substring(1); // remove o #
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
        modal.querySelector(".modal-content").focus();
      }
    });
  });

  closeButtons.forEach(span => {
    span.addEventListener("click", () => {
      const modal = span.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  window.addEventListener("click", (event) => {
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  window.addEventListener("keydown", (event) => {
    if(event.key === "Escape"){
      modals.forEach(modal => {
        if(modal.style.display === "block"){
          modal.style.display = "none";
        }
      });
    }
  });
});
