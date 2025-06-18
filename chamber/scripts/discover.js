const url = "data/discover.json"; // Altere se o JSON estiver em outro local
const container = document.querySelector(".cards_container");

async function loadPlaces() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    const places = await response.json();
    displayPlaces(places);
  } catch (error) {
    console.error("Error loading places:", error);
    container.innerHTML = "<p>Could not load places. Please try again later.</p>";
  }
}

function displayPlaces(places) {
  places.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("place_card");

    const image = document.createElement("img");
    image.src = place.imagesrc;
    image.alt = place.imagealt;
    image.loading = "lazy";

    const title = document.createElement("h4");
    title.textContent = place.name;

    const address = document.createElement("p");
    address.textContent = place.address;
    

    const description = document.createElement("p");
    description.textContent = place.description;
    description.classList.add("place_description");


    const link = document.createElement("a");
    link.href = place.link;
    link.textContent = "Learn More";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(link);

    container.appendChild(card);
  });
}

loadPlaces();
