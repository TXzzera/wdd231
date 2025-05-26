const url = 'data/members.json';
const cardsContainer = document.querySelector('.members_cards');

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
}

getMembers();

const displayMembers = (members) => {
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    const name = document.createElement('h4');
    name.textContent = member.name;

    // Membership Level
    
    const membership = document.createElement('p');
    membership.classList.add('membership-level');
    let membershipText = '';
    let membershipColor = '';

    switch(member["membership-level"]) {
      case 1:
        membershipText = 'Member';
        membershipColor = 'bronze'; 
        membership.style.color = '#cd7f32'; 
        break;
      case 2:
        membershipText = 'Silver';
        membership.style.color = 'silver'; 
        break;
      case 3:
        membershipText = 'Gold';
        membership.style.color = 'gold'; 
        break;
    }
    membership.textContent =  membershipText;

    const segment = document.createElement('p');
    segment.textContent = member.segment;

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${member["phone-number"]}`;

    const website = document.createElement('a');
    website.href = member.website;
    website.textContent = "Visit Website";
    website.target = "_blank";

    const icon = document.createElement('img');
    icon.setAttribute('src', `images/${member.icon}`);
    icon.setAttribute('alt', `Logo of ${member.name}`);
    icon.setAttribute('loading', 'lazy');

    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(membership);  
    card.appendChild(segment);     
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    cardsContainer.appendChild(card);
  });

}
