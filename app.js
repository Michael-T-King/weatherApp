const form = document.querySelector('form');
const data = document.querySelector('.data');
const img = document.querySelector('.img');

form[1].addEventListener('click', (event) => {
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form[0].value}&appid=ae8b237d5b1f593d01ca97d2ce2f6e36`)
        .then((res) => res.json())
        .then((json) => {
            if (json.message && json.message.toLowerCase() === 'city not found') {
                alert('Location is not found. Try entering a valid city name.');
                return;
            }

            let sunriseTimestamp = json.sys.sunrise * 1000;
            let sunriseDate = new Date(sunriseTimestamp);
            let sunsetTimestamp = json.sys.sunset * 1000;
            let sunsetDate = new Date(sunsetTimestamp);

            console.log(sunriseDate);

            let currentDate = new Date();
            let localTime = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
            let targetTime = localTime + (json.timezone * 1000);
            let targetDate = new Date(targetTime);

            let hours = targetDate.getHours();
            let minutes = targetDate.getMinutes();
            let seconds = targetDate.getSeconds();

            if (hours < 10) {
                hours = `0${hours}`;
            }

            if (minutes < 10) {
                minutes = `0${minutes}`;
            }

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            let gust = json.wind.gust || 0;

            data.innerHTML = `
                <p class="sun__rise">
                    <img class="day__time" src="./sunRise.png">
                    ${sunriseDate}
                </p>
                <p class="sun__set">
                    <img class="day__time" src="./sunSat.png">
                    ${sunsetDate}
                </p>
                <h1 class="country">${json.sys.country}</h1>
                <h2 class="city">${json.name}</h2>
                <h3 class="temp">${Math.floor(json.main.temp - 273.15)}\u00B0C</h3>
                <h4 class="clouds">${json.weather[0].description}</h4>
                <h4 class="wind">
                    <img class="day__time" src="./windpng.png">  
                    Wind: ${json.wind.deg}\u00B0 ${Math.ceil(json.wind.speed)} m/s
                    <p class="gusts">gust: ${Math.ceil(gust)} m/s</p>
                </h4>
                <h4 class="pressure">QNH ${json.main.pressure} hPa</h4>
                <h4 class="time">Time: ${hours}:${minutes}:${seconds}</h4>
                <img class="img" src="http://openweathermap.org/img/w/${json.weather[0].icon}.png">
            `;
        });
});