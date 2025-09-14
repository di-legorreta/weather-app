// formatted day

function formatDate(today) {
  let minutes = today.getMinutes();
  let hours = today.getHours();
  let day = today.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[day];
  return `${currentDay} ${hours}:${minutes}`;
}

let newSentence = document.querySelector("#day-time");
let today = new Date();

newSentence.innerHTML = formatDate(today);

// search engine

let apiKey = "297bdob5643aebcfc422bc019b792eta";

function search(event) {
  event.preventDefault();

  let input = document.querySelector("#search-input");
  let city = (input.value || "").trim();

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  function callApi(response) {
    console.log(response.data);

    if (
      !response.data ||
      !response.data.city ||
      !response.data.temperature ||
      typeof response.data.temperature.current !== "number"
    ) {
      alert("City not found. Try another spelling.");
      return;
    }

    let searchCity = response.data.city;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = `${searchCity}`;

    let searchTemp = Math.round(response.data.temperature.current);
    let tempElement = document.querySelector("#fake-temp");
    tempElement.innerHTML = `${searchTemp}°C`;

    let searchCond = response.data.condition.description;
    let condElement = document.querySelector("#condition-description");
    condElement.innerHTML = `${searchCond}`;

    let searchHumid = Math.round(response.data.temperature.humidity);
    let humidElement = document.querySelector("#humidity");
    humidElement.innerHTML = `${searchHumid}%`;

    let searchWind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${searchWind}km/h`;

    let searchIcon = response.data.condition.icon_url;
    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${searchIcon}" alt="${searchCond}" width="72" height="72">`;
  }

  axios.get(apiUrl).then(callApi);
}

let form = document.querySelector("#city-input");
form.addEventListener("submit", search);
