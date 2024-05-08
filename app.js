//This is a weather data class that will have a constructor that is created when fethcing the data from the api
class WeatherData {
    constructor(name, temperature, min, max, humidity, feelsLike,wind, description) {
        this.name = name;
        this.temperature = temperature;
        this.min = min;
        this.max = max;
        this.humidity = humidity;
        this.feelsLike = feelsLike;
        this.wind = wind;
        this.description = description;
    }
}
// Inherited subclasses from WeatherData, representing specific weather conditions
class Sunny extends WeatherData {
    constructor(name, temperature, min, max, humidity, feelsLike, wind, description) {
        super(name, temperature, min, max, humidity, feelsLike,wind, description);
        this.backgroundImage = ("https://media.istockphoto.com/id/626639738/vector/vector-illustration-of-green-landscape.jpg?s=612x612&w=0&k=20&c=Bu1bkt8_bEkK_hZUOiUuLWlq9J95O9KfdJOM9VYMMBI=");
    }
}
class Cloudy extends WeatherData {
    constructor(name, temperature, min, max, humidity, feelsLike,wind, description) {
        super(name, temperature, min, max, humidity, feelsLike,wind, description);
        this.backgroundImage = ("https://static.vecteezy.com/system/resources/previews/015/942/540/original/cartoon-sky-with-random-clouds-background-illustration-sky-design-free-vector.jpg");
    }
}
class Snowy extends WeatherData {
    constructor(name, temperature, min, max, humidity, feelsLike,wind, description) {
        super(name, temperature, min, max, humidity, feelsLike,wind, description);
        this.backgroundImage = ("https://img.freepik.com/free-vector/scene-with-snow-falling-field_1308-43997.jpg");
    }
}
class Rainy extends WeatherData {
    constructor(name, temperature, min, max, humidity, feelsLike,wind, description) {
        super(name, temperature, min, max, humidity, feelsLike,wind, description);
        this.backgroundImage = ("https://images.template.net/218832/rainy-sky-background-edit-online-1.jpg");
    }
}
// This function creates instances of WeatherData subclasses based off of the parameters
function createWeatherInstance(name, temperature, min, max, humidity, feelsLike,wind, description) {
    if (description.toLowerCase().includes("clear")) {
        return new Sunny(name, temperature, min, max, humidity, feelsLike,wind, description);
    } else if (description.toLowerCase().includes("rain")) {
        return new Rainy(name, temperature, min, max, humidity, feelsLike,wind, description);
    } else if (description.toLowerCase().includes("cloud")) {
        return new Cloudy(name, temperature, min, max, humidity, feelsLike,wind, description);
    } else if (description.toLowerCase().includes("snow")) {
        return new Snowy(name, temperature, min, max, humidity, feelsLike,wind, description);
    } else {
        return new WeatherData(name, temperature, min, max, humidity, feelsLike,wind, description);
    }
}
/* This fetweather function takes in the ids of the button search input and weather resultId from Html
searches for the city with input when search button is clicked uses url with apikey and city input given*/
function fetchWeather(SearchBtnID, weatherResultId, cityInputId, className) {
    document.getElementById(SearchBtnID).addEventListener('click', function () {
        const city = document.getElementById(cityInputId).value;
        const apiKey = '991cbb58989f17eb66e709621d75ef48';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherData = createWeatherInstance(
                    data.name,
                    data.main.temp,
                    data.main.temp_min,
                    data.main.temp_max,
                    data.main.humidity,
                    data.main.feels_like,
                    data.wind.speed,
                    data.weather[0].description
                );
                displayWeather(weatherResultId, weatherData, className);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById(weatherResultId).innerHTML = '<p>Weather information not available. Try again.</p>';
            });
    });
}
// This function displays the weather information on the webpage, including temperature, humidity, wind, etc...
function displayWeather(weatherResultId, weatherData, className) {
    const result = `
        <div class = "weather-info">
            <h2>Weather in ${weatherData.name}</h2>
            <div class = "temp-info">
                
                <p><img src="https://cdn2.iconfinder.com/data/icons/science-and-technology-2-17/48/87-512.png" alt="thermometer image"> <br>
                <span>Temperature:</span> ${((weatherData.temperature) * (9 / 5) + 32).toFixed(0)} °F</p>
            </div>
            <div class="high-low">
                <p id="high">High: ${((weatherData.max) * (9 / 5) + 32).toFixed(0)}°F</p>
                <p id="low">Low: ${((weatherData.min) * (9 / 5) + 32).toFixed(0)}°F</p>
            </div>
            <div class= "feels-info">
                <p><span>Feels Like:</span> <br>${((weatherData.feelsLike) * (9 / 5) + 32).toFixed(0)} °F</p>
            </div>
            <div class = "humidity-info">
                <p><span>Humidity:</span> <br>${weatherData.humidity} %</p>
            </div>
            <div class = "wind-status">
                <p><img src="https://static.vecteezy.com/system/resources/thumbnails/022/185/473/small/hand-drawn-doodle-wind-blow-clip-art-free-png.png" alt="wind image"> <br><span>Wind Status:</span> ${weatherData.wind} m/h</p>
            </div>
            <div class="cond-info">
            <p><span>Conditions:</span> ${weatherData.description}</p>
            </div>
        </div> `;
    document.getElementById(weatherResultId).innerHTML = result;
    const element = document.getElementsByClassName(className)[0];
    element.style.backgroundImage = `url(${weatherData.backgroundImage})`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundRepeat = 'no-repeat';

}
fetchWeather("searchBtn1", "weatherResult1", "cityInput1", "weather1");
fetchWeather("searchBtn2", "weatherResult2", "cityInput2", "weather2");
fetchWeather("searchBtn3", "weatherResult3", "cityInput3", "weather3");
fetchWeather("searchBtn4", "weatherResult4", "cityInput4", "weather4");
