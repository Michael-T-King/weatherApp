const form = document.querySelector('form');
const data = document.querySelector('.data');
const img = document.querySelector('.img');


form[1].addEventListener('click', (event) => {
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form[0].value}&appid=ae8b237d5b1f593d01ca97d2ce2f6e36`)
        .then((res) => res.json())
        .then((json) => {

            if (json.message && json.message.toLowerCase() === 'city not found') {
                alert('location is not found. try to add any location');
                return;
            }

            let sunriseTimestamp = json.sys.sunrise;
            let sunriseDate = new Date(sunriseTimestamp * 1000);
            let sunsetTimestamp = json.sys.sunset;
            let sunsetDate = new Date(sunsetTimestamp * 1000);
            
            let currentDate = new Date(); // Получение текущей даты и времени
            let Hours = currentDate.getHours(); // Получение текущего часа
            let Minutes = currentDate.getMinutes(); // Получение текущих минут
            let Seconds = currentDate.getSeconds(); // Получение текущих секунд
            let Gust = json.wind.gust;

            if(Hours <10) {
            Hours =   Hours.textContent = `0${Hours}`   
            }
            else Hours = Hours;
            if(Minutes <10) {
                Minutes =   Minutes.textContent = `0${Minutes}`   
              }
              else Minutes =Minutes;

              if (isNaN(Gust)) {
                Gust = 0;
              }
            
            data.innerHTML = `
                <p class="sun__rise">
                    <img class="dayTime" src="/sunRise.png">
                    ${sunriseDate}
                </p>
                <p class="sun__set">
                    <img class="dayTime" src="/sunSat.png">
                    ${sunsetDate}
                </p>
                <h1 class="country">${json.sys.country}</h1>
                <h2 class="city">${json.name}</h2>
                <h3 class="temp">${Math.floor(json.main.temp - 273.15)}\u00B0C</h3>
                <h4 class="clouds">${json.weather[0].description}</h4>

                <h4 class="wind"> <img class = "dayTime" src = "/windpng.png">  
                Wind: ${json.wind.deg}\u00B0 ${Math.ceil(json.wind.speed)} m/s     <p class = "gusts">gust:${Math.ceil(Gust)} m/s</p></h4>

                <h4 class = "pressure"> QNH ${json.main.pressure}HPa</h4>
                
                <<h4 class="time">Time: ${Hours - json.timezone / 3600}: ${Minutes}</h4>
                <img class="img" src="http://openweathermap.org/img/w/${json.weather[0].icon}.png">
            `;
            console.log(json.timezone / 3600);
        });
});