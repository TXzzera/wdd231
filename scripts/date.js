const currentYear = new Date().getFullYear();

document.getElementById('currentYear').innerHTML = `© ${currentYear} Bruno de Sousa Teixeira - São Paulo, Brazil <img src="images/Flag_of_Brazil.png" alt="Flag of Brazil" width="20" height="15">`;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last updated: ${lastModified}`;
