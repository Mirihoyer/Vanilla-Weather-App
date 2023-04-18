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

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
return  days[day];
}

function displayForecast(response) {

    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row"> `;


    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
        forecastHTML =
            forecastHTML +
            ` 
            <div class="col-2">
            <div class="forecastDate">
                ${formatDay(forecastDay.time)}
            </div>
            <img width="80px"
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                alt="">
            <div class="forecastTemp">
                <span class="tempMax">${Math.round(forecastDay.temperature.maximum)}°
                </span>
                <span class="tempMin">
                ${Math.round(forecastDay.temperature.minimum)}°
                </span>
            </div>
        </div>
    `;
   } }); 
    forecastHTML = forecastHTML + `</div> `;
    forecastElement.innerHTML = forecastHTML;
    
}

function getForecast(coordinates) {

    let apiKey = "cb65f87d0t540475bab893o006f70dfb";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let description = document.querySelector("#description");
    let temperatureIcon = document.querySelector("#icon");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");

    temperatureElement.innerHTML = Math.round(celsTemp);
    celsTemp = response.data.temperature.current;
    cityElement.innerHTML = response.data.city;
    description.innerHTML = response.data.condition.description;
    temperatureIcon.src = response.data.condition.icon_url;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);

    getForecast(response.data.coordinates);
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

let celsTemp = null;

/*function displayFahrTemp(event) {
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
}*/





let form = document.querySelector("#searchForm");
form.addEventListener("submit", updateCity);

//let fahrLink = document.querySelector("#fahrLink");
//fahrLink.addEventListener("click", displayFahrTemp);

//let celsLink = document.querySelector("#celsLink");
//celsLink.addEventListener("click", displayCelsTemp);

search("Buenos Aires");