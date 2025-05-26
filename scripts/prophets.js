const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphets() {
    const response = await fetch(url);
    const data = await response.json();
   // console.table(data.prophets);
   displayProphets(data.prophets); //array of prophets
}

getProphets();

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement('section');
        const h2 = document.createElement('h2');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const image = document.createElement('img');

        h2.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        image.setAttribute('src', prophet.imageurl);
        image.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);

        card.appendChild(h2);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(image);

        cards.appendChild(card);
    });
}