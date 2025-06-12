// scripts/thankyou.js

document.addEventListener('DOMContentLoaded', () => {
  const fname = localStorage.getItem('fname') || '';
  const lname = localStorage.getItem('lname') || '';
  const email = localStorage.getItem('email') || '';
  const phone = localStorage.getItem('phonenumber') || '';
  const orgname = localStorage.getItem('orgname') || '';
  const timestamp = localStorage.getItem('timestamp') || '';

  document.getElementById('display-fname').textContent = fname;
  document.getElementById('display-lname').textContent = lname;
  document.getElementById('display-email').textContent = email;
  document.getElementById('display-phone').textContent = phone;
  document.getElementById('display-orgname').textContent = orgname;
  document.getElementById('display-timestamp').textContent = timestamp;
});
