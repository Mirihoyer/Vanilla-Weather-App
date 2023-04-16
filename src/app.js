function formatDate(timestamp) {
    let date = new Date(timestamp);

    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];

    return `${day} ${hour}:${minute}hs`;
};



function displayTemperature(response) {

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsTemp);
    celsTemp = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    let description = document.querySelector("#description");
    description.innerHTML = response.data.condition.description;
    let temperatureIcon = document.querySelector("#icon");
    temperatureIcon.src = response.data.condition.icon_url;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.time * 1000);
   
}

function search(city) {
    let apiKey = "cb65f87d0t540475bab893o006f70dfb";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
}

function updateCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#cityInput");
    search(cityInput.value);

}
search("Buenos Aires");

function displayFahrTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsLink.classList.remove("active");
    fahrLink.classList.add("active");
    let fahrTemp = (celsTemp * 9) / 5 + 32;
     temperatureElement.innerHTML = Math.round(fahrTemp); 
}

function displayCelsTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsLink.classList.add("active");
    fahrLink.classList.remove("active");
temperatureElement.innerHTML = Math.round(celsTemp);
}

let celsTemp = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", updateCity);

let fahrLink = document.querySelector("#fahrLink");
fahrLink.addEventListener("click", displayFahrTemp);

let celsLink = document.querySelector("#celsLink");
celsLink.addEventListener("click", displayCelsTemp);
