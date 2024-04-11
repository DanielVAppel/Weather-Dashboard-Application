document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'YOUR_API_KEY'; // Replace YOUR_API_KEY with your actual OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const result = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Conditions: ${data.weather[0].description}</p>
        `;
        document.getElementById('weatherResult').innerHTML = result;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherResult').innerHTML = '<p>Weather information not available. Try again.</p>';
    });
});
