// fetchapi.js

function buttonClicked() {
    var searchData = document.getElementById("SearchData").value;

    // Call the first API to get weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=9fd7a449d055dba26a982a3220f32aa2`)
        .then((response) => response.json())
        .then((weatherData) => {
            console.log(weatherData);

            // Display weather data
            displayWeatherData(weatherData);

            // Call the second API to get country data
            return fetch(`https://restcountries.com/v2/name/${searchData}`);
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((countryData) => {
            console.log(countryData);

            // Display country data
            displayCountryData(countryData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            // Handle error, e.g., display an error message to the user
        });
}

function displayWeatherData(data) {
    document.getElementById("country").innerHTML = `City: ${data.name}, Country: ${data.sys.country}`;
    document.getElementById("coordinates").innerHTML = `Coordinates: [${data.coord.lat}, ${data.coord.lon}]`;
    document.getElementById("Weather").innerHTML = `Weather: ${data.weather[0].description}`;
    document.getElementById("tempK").innerHTML = `Temperature: ${data.main.temp} Kelvin`;

    // Convert temperature to Celsius
    var celcius = data.main.temp - 273.15;
    document.getElementById("tempC").innerHTML = `Temperature: ${celcius.toFixed(2)} Celsius`;

    document.getElementById("minTemp").innerHTML = `Min Temp: ${data.main.temp_min} Kelvin`;
    document.getElementById("MaxTemp").innerHTML = `Max Temp: ${data.main.temp_max} Kelvin`;
    document.getElementById("humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

    // Check if sea_level property exists before accessing it
    if (data.main.hasOwnProperty('sea_level')) {
        document.getElementById("sea_level").innerHTML = `Sea Level: ${data.main.sea_level} metres above sea level`;
    } else {
        document.getElementById("sea_level").innerHTML = "Sea Level: Not available";
    }

    var sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    var sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById("sunriseSunset").innerHTML = `Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`;
}

function displayCountryData(data) {
    if (data.length > 0) {
        var country = data[0];
        document.getElementById("country").innerHTML = `Country Name: ${country.name}`;
        document.getElementById("commonName").innerHTML = `Common Name: ${country.altSpellings[0]}`;
        document.getElementById("capital").innerHTML = `Capital: ${country.capital}`;

        // Displaying the flag if available
        if (country.flags && country.flags.svg) {
            document.getElementById("flag").innerHTML = `<img src="${country.flags.svg}" alt="Flag" width="300" >`;
        } else {
            document.getElementById("flag").innerHTML = "Flag: Not available";
        }

        var currencyNames = country.currencies.map(currency => currency.name).join(', ');
        document.getElementById("currencies").innerHTML = `Currencies: ${currencyNames}`;
        document.getElementById("region").innerHTML = `Region: ${country.region}`;
        document.getElementById("languages").innerHTML = `Languages: ${country.languages.map(lang => lang.name).join(', ')}`;
        document.getElementById("population").innerHTML = `Population: ${country.population}`;
        document.getElementById("location").innerHTML = `Location: [${country.latlng.join(', ')}]`;

        // Google Map link
        var mapLink = `https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`;
        document.getElementById("googleMap").innerHTML = `<a href="${mapLink}" target="_blank">Google Map</a>`;
    } else {
        // Clear data if no results
        document.getElementById("country").innerHTML = "";
        // ... (other elements)
        document.getElementById("flag").innerHTML = "Flag: Not available";
    }
}




function updateDateTime() {
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    var dateTimeString = now.toLocaleString('en-US', options);
    document.getElementById('datetime').textContent = dateTimeString;
}

updateDateTime();
setInterval(updateDateTime, 1000);
