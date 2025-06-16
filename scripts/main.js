const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('menu');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('active');
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
});

const playersContainer = document.getElementById('players-container');
const teamFilter = document.getElementById("teamFilter");
const positionFilter = document.getElementById("positionFilter");
const dayFilter = document.getElementById("dayFilter");
const matchList = document.getElementById("match-list");

let allPlayers = [];
const teamsMap = {};

function positionIdToName(posId) {
  switch (posId) {
    case 1: return "Goalkeeper";
    case 2: return "Defender";
    case 3: return "Midfielder";
    case 4: return "Forward";
    default: return "Unknown";
  }
}

function renderPlayers(list) {
  playersContainer.innerHTML = "";

  if(list.length === 0) {
    playersContainer.textContent = "No players found.";
    return;
  }

  list.forEach(player => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <h3>${player.name}</h3>
      <p><strong>${player.position}</strong> - ${player.teamName}</p>
      <p>Price: C$ ${player.price.toFixed(1)}</p>
      <button class="details-btn">View Details</button>
    `;

    card.querySelector('.details-btn').addEventListener('click', () => showModal(player));
    playersContainer.appendChild(card);
  });
}

function populateFilters() {
  teamFilter.innerHTML = '<option value="all">All Teams</option>';
  positionFilter.innerHTML = `
    <option value="all">All Positions</option>
    <option value="Goalkeeper">Goalkeeper</option>
    <option value="Defender">Defender</option>
    <option value="Midfielder">Midfielder</option>
    <option value="Forward">Forward</option>
  `;

  const uniqueTeams = [...new Set(allPlayers.map(p => p.teamName))].sort();

  uniqueTeams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
  });
}

teamFilter.addEventListener("change", filterPlayers);
positionFilter.addEventListener("change", filterPlayers);

function filterPlayers() {
  const selectedTeam = teamFilter.value;
  const selectedPosition = positionFilter.value;

  const filtered = allPlayers.filter(player => {
    const teamMatch = selectedTeam === "all" || player.teamName === selectedTeam;
    const positionMatch = selectedPosition === "all" || player.position === selectedPosition;
    return teamMatch && positionMatch;
  });

  renderPlayers(filtered);
}

// Modal logic
const modal = document.getElementById("playerModal");
const modalContent = document.getElementById("modalContent");
const closeBtn = modalContent.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
});

function showModal(player) {
  modalContent.querySelector('h2')?.remove();
  modalContent.querySelector('img')?.remove();
  modalContent.querySelectorAll('p').forEach(p => p.remove());

  const title = document.createElement('h2');
  title.textContent = player.name;
  const img = document.createElement('img');
  img.src = player.image;
  img.alt = player.name;
  img.style.width = "100%";
  img.style.borderRadius = "12px";

  const teamP = document.createElement('p');
  teamP.innerHTML = `<strong>Team:</strong> ${player.teamName}`;

  const posP = document.createElement('p');
  posP.innerHTML = `<strong>Position:</strong> ${player.position}`;

  const priceP = document.createElement('p');
  priceP.innerHTML = `<strong>Price:</strong> C$ ${player.price.toFixed(1)}`;

  const descP = document.createElement('p');
  descP.textContent = player.description;

  modalContent.appendChild(title);
  modalContent.appendChild(img);
  modalContent.appendChild(teamP);
  modalContent.appendChild(posP);
  modalContent.appendChild(priceP);
  modalContent.appendChild(descP);

  modal.style.display = "flex";
  modal.setAttribute('aria-hidden', 'false');
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
  }
});

async function fetchPlayers() {
  try {
    const response = await fetch('./scripts/serie_a_2024_full.json');
    const data = await response.json();

    // Market status
    const marketStatusElement = document.getElementById("market-status");
    marketStatusElement.textContent = data.status_mercado?.mensagem || "Market status not available.";

    // Prepare days filter for calendar
    const uniqueDays = [...new Set(data.rodadas_proximas.map(r => r.day))];
    uniqueDays.unshift("all"); // option to show all

    if(dayFilter){
      dayFilter.innerHTML = "";
      uniqueDays.forEach(day => {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day === "all" ? "All Days" : day;
        dayFilter.appendChild(option);
      });

      dayFilter.addEventListener("change", (e) => {
        renderMatchesByDay(e.target.value);
      });
    }

    function renderMatchesByDay(selectedDay) {
      matchList.innerHTML = "";
      const roundsToRender = selectedDay === "all" ? data.rodadas_proximas : data.rodadas_proximas.filter(r => r.day === selectedDay);

      roundsToRender.forEach(round => {
        const roundHeader = document.createElement("li");
        roundHeader.innerHTML = `<strong>${round.day} - ${round.date}</strong>`;
        matchList.appendChild(roundHeader);

        round.games.forEach(game => {
          const matchItem = document.createElement("li");
          matchItem.textContent = `${game.home} vs ${game.away}`;
          matchList.appendChild(matchItem);
        });
      });
    }

    renderMatchesByDay("all");

    // Prepare teams map
    Object.entries(data.clubes).forEach(([teamId, teamData]) => {
      teamsMap[teamId] = teamData.nome;
    });

    // Prepare players
    allPlayers = Object.values(data.atletas).map(player => ({
      id: player.atleta_id,
      name: player.nome,
      teamId: player.clube_id.toString(),
      teamName: teamsMap[player.clube_id],
      position: positionIdToName(player.posicao_id),
      price: player.preco / 10,
      image: `https://s3.amazonaws.com/comunidades.globo.com/cartola-fc/atletas/fotos/${player.atleta_id}.png`,
      description: player.apelido || player.nome,
      status: player.status_id,
    }));

    renderPlayers(allPlayers);
    populateFilters();

  } catch (error) {
    console.error("Error fetching players:", error);
  }
}

fetchPlayers();
