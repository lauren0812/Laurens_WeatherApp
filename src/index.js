let now = new Date();
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = week[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours() % 12 || 12;
if (hour < 10) {
  hour = `0${hour}`;
}
let ampm = hour >= 12 ? "am" : "pm";
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let calendar = document.querySelector("#date");
calendar.innerHTML = `${day} </br> ${month} ${date}, ${year}`;
let time = document.querySelector("#time");
time.innerHTML = `Last updated: <br> ${hour}:${minute} ${ampm}`;

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#currentTemp");
  let city = document.querySelector("#location");
  let description = document.querySelector("#conditions");
  let windSpeed = document.querySelector("#windMph");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "92c0930d21529919627d7d87af3dfb57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

function displayFahenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

search("Denver");

let form = document.querySelector("#weather-search");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
