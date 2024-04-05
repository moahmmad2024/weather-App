const apiKey = "bc20673bc80c6a585f6152ac2e758114";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();
        
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            displayWeatherData(data);
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

function displayWeatherData(data) {
    switch (data.weather[0].main.toLowerCase()) {
        case "clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "mist":
            weatherIcon.src = "images/mist.png";
            break;
        default:
            weatherIcon.src = ""; // Set a default icon or leave it blank
    }
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    } else {
        console.error("Please enter a city name.");
    }
});
