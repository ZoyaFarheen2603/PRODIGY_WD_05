const apiKey = '459f4ba0381feded6cb350b7432204e1'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const weatherOutput = document.getElementById('weather-output');
const cityElement = document.getElementById('city');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Fetch weather data from OpenWeatherMap API
async function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Handle specific HTTP errors
            if (response.status === 404) {
                throw new Error('City not found. Please check the name and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your API key.');
            } else {
                throw new Error('An error occurred. Please try again later.');
            }
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

// Display weather data in the UI
function displayWeather(data) {
    const { name: city } = data;
    const { description } = data.weather[0];
    const { temp } = data.main;
    const { humidity: hum } = data.main;
    const { speed: wind } = data.wind;

    cityElement.textContent = `Weather in ${city}`;
    weatherDescription.textContent = `Condition: ${description}`;
    temperature.textContent = `Temperature: ${temp} °C`;
    humidity.textContent = `Humidity: ${hum}%`;
    windSpeed.textContent = `Wind Speed: ${wind} m/s`;

    weatherOutput.style.display = 'block';
}

// Display error messages in the UI
function showError(message) {
    cityElement.textContent = '';
    weatherDescription.textContent = message;
    temperature.textContent = '';
    humidity.textContent = '';
    windSpeed.textContent = '';
    weatherOutput.style.display = 'block';
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeather(location);
    } else {
        showError('Please enter a valid city name.');
    }
});
