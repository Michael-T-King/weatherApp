const form = document.querySelector('form');
const data = document.querySelector('.data');
const img = document.querySelector('.img');

form[1].addEventListener('click', (event) => {
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form[0].value}&appid=ae8b237d5b1f593d01ca97d2ce2f6e36`)
        .then((res) => res.json())
        .then((json) => {
            if (json.message && json.message.toLowerCase() === 'city not found' ) {
                alert('Location is not found. Try entering a valid city name.');
                return;
            }
            form[0].value = "";

        // считаем восход солнца -----------------------------
            let sunriseTimestamp = json.sys.sunrise;
            let sunriseSeconds = sunriseTimestamp % 60;
            let sunriseMinutes = Math.floor((sunriseTimestamp / 60) % 60);
            let sunriseHours = Math.floor((sunriseTimestamp / 3600) % 24);

            let GTM = json.timezone/3600;
            let sunriseHoursGTM = (sunriseHours + GTM)%24;
            if (sunriseHoursGTM < 0) {
                sunriseHoursGTM += 24;
            }
            if(sunriseHoursGTM <10) {
                sunriseHoursGTM = `0${sunriseHoursGTM}`  
            }

            if (sunriseMinutes <10) {
                sunriseMinutes = `0${sunriseMinutes}`
            }
            let sunriseTime = `${sunriseHoursGTM}:${sunriseMinutes}`;


            // считаем заход солнца ----------------------------

            let sunSetTimestamp = json.sys.sunset;
            let sunSetSeconds = sunSetTimestamp % 60;
            let sunSetMinutes = Math.floor((sunSetTimestamp / 60) % 60);
            let sunSetHours = Math.floor((sunSetTimestamp / 3600) % 24);
            let sunSetHoursGTM = (sunSetHours + GTM)%24;
            if (sunSetHoursGTM < 0) {
                sunSetHoursGTM += 24;
              }

              if (sunSetHoursGTM <10) {
                sunSetHoursGTM  = `0${sunSetHoursGTM }`
            }

              if (sunSetMinutes <10) {
                sunSetMinutes = `0${sunSetMinutes}`
            }
            let sunSetTime = `${sunSetHoursGTM}:${sunSetMinutes}`;

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
                    loc.time ${sunriseTime}
                </p>
                <p class="sun__set">
                    <img class="day__time" src="./sunSat.png">
                    loc.time ${sunSetTime}
                </p>
                <h1 class="country">${json.sys.country}</h1>
                <h2 class="city">${json.name}</h2>
                <h3 class="temp">${Math.round(json.main.temp - 273.15)}\u00B0C</h3>
                <h4 class="clouds">${json.weather[0].description}</h4>
                <h4 class="wind">
                    <img class="day__time" src="./windpng.png">  
                    Wind: ${json.wind.deg}\u00B0 ${Math.ceil(json.wind.speed)} m/s
                    <p class="gusts">gust: ${Math.ceil(gust)} m/s</p>
                </h4>
                <h4 class="pressure">QNH ${json.main.pressure} hPa</h4>
                <h4 class="time">Loc.Time: ${hours}:${minutes}:${seconds}</h4>
                <img class="img" src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png">
            `;

            let pressure = document.querySelector('.pressure');
            let container = document.querySelector('.container');
            let city = document.querySelector('.city');
            let wind = document.querySelector('.wind');
            let time = document.querySelector('.time');
            
            if (hours >= 5 && hours < 17) {
            container.style.backgroundImage = "url('./day.jpg')";
            container.style.backgroundSize = "cover";
            container.style.backgroundRepeat = "no-repeat";
            container.style.backgroundPosition = "center";
            } 

            else if (hours >=17 && hours < 21){
                container.style.backgroundImage = "url('./evening.jpg')";
                container.style.backgroundSize = "cover";
                container.style.backgroundRepeat = "no-repeat";
                container.style.backgroundPosition = "center";
                pressure.style.color = "#777";
                container.style.color = "#fff";
            }
            
            else {
            container.style.backgroundImage = "url('./night.jpg')";
            container.style.backgroundSize = "cover";
            container.style.backgroundRepeat = "no-repeat";
            container.style.backgroundPosition = "center";
            container.style.backgroundColor = "rgba(0,0,0, 0.4)";
            container.style.color = "#fff";
            city.style.color = "#666";
            wind.style.color = "#666";
            pressure.style.color = "#777";
            time.style.color = "#666";
            }

        });

});