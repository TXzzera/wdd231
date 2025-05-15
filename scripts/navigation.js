document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuButton.addEventListener("click", function () {
        menu.classList.toggle("show");
    });});