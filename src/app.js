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
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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

let form = document.querySelector("#searchForm");
form.addEventListener("submit", updateCity);

search("Paris");
