const url = 'data/members.json';
const spotlightContainer = document.querySelector('.spotlight-members');

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displaySpotlights(data);
}

getMembers();

function displaySpotlights(members) {
  
  const goldMembers = members.filter(member => member["membership-level"] === 3);
  const silverMembers = members.filter(member => member["membership-level"] === 2);
  const spotlightMembers = [...goldMembers, silverMembers[0]].slice(0, 3);

  spotlightMembers.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('spotlight-card');

    const name = document.createElement('h4');
    name.textContent = member.name;

    const membership = document.createElement('p');
    membership.classList.add('membership-level');
    let membershipText = '';
    switch (member["membership-level"]) {
      case 1:
        membershipText = 'Member';
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
    membership.textContent = membershipText;

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

    spotlightContainer.appendChild(card);
  });
}

const apiKey = "4d3bb6bfcdc23c1a6e59f83ff454d77f";
const city = "São Paulo";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const descriptionEl = document.getElementById("weather-description");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");
const weatherInfoEl = document.querySelector(".weather-info");
const forecastContainer = document.querySelector(".forecast");

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();

    const weatherTitle = document.createElement("h4");
    weatherTitle.textContent = "Today";
    weatherTitle.classList.add("weather-title");

    const weatherInfoEl = document.querySelector(".weather-info");
    weatherInfoEl.prepend(weatherTitle);

    const description = capitalize(data.weather[0].description);
    descriptionEl.textContent = `Weather: ${description}`;

    const minTempEl = document.createElement("p");
    minTempEl.textContent = `Low: ${Math.round(data.main.temp_min)}°C`;

    const maxTempEl = document.createElement("p");
    maxTempEl.textContent = `High: ${Math.round(data.main.temp_max)}°C`;

    weatherInfoEl.insertBefore(minTempEl, humidityEl);
    weatherInfoEl.insertBefore(maxTempEl, humidityEl);

    humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    const forecastList = data.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0, 3);

    forecastContainer.innerHTML = "";

    const forecastTitle = document.createElement("h4");
    forecastTitle.textContent = "3-Day Forecast";
    forecastTitle.classList.add("forecast-title");
    forecastContainer.appendChild(forecastTitle);

    const cardsWrapper = document.createElement("div");
    cardsWrapper.classList.add("forecast-cards-container");

    forecastList.forEach(day => {
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const icon = day.weather[0].icon;
      const description = capitalize(day.weather[0].description);
      const temp = Math.round(day.main.temp);

      const card = document.createElement("div");
      card.classList.add("forecast-card");

      card.innerHTML = `
        <h4>${dayName}</h4>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p>${description}</p>
        <p>${temp}°C</p>
      `;

      cardsWrapper.appendChild(card);
    });

    forecastContainer.appendChild(cardsWrapper);

  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

getWeather();
getForecast();

