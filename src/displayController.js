import * as APIController from "./apiController";

const displayController = ( (doc) => {
    const CONTENT_CONTAINER = doc.querySelector('#content');

    
    const createNavBar = () => {
        const navbar = doc.createElement('nav');
        navbar.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>
                            <p>WEATHER APP</p>`;

        return navbar;
    }

    const createFooter = () => {
        const footer = doc.createElement('footer');
        footer.innerHTML = `<p class="footer-text">Copyright © 2022 
                            <a href="https://github.com/ogulcancicek">ogulcancicek</a> 
                            </p>`;

        return footer;
    }

    const createWeatherAppContainer = () => {
        const appContainer = doc.createElement('div');
        appContainer.classList.add('app-container');

        appContainer.appendChild(createSearchBox());

        return appContainer;
    }

    const createSearchBox = () => {
        const searchBoxContainer = doc.createElement('div');
        searchBoxContainer.classList.add('search-box');
        searchBoxContainer.classList.add('container');

        const input = doc.createElement('input');
        input.classList.add('search-box-input');
        input.setAttribute('placeholder','Search Location...')

        const searchBtn = doc.createElement('button');
        searchBtn.classList.add('location-search-btn');
        searchBtn.textContent = 'Search';

        searchBoxContainer.appendChild(input);
        searchBoxContainer.appendChild(searchBtn);

        return searchBoxContainer;
    }

    const createCurrentStatsContainer = (weatherData) => {
        const container = doc.createElement('div');
        container.classList.add('current-stats-container');

        const cityName = weatherData.name;
        const currentTemp = weatherData.current.temp;
        const feelsLike = weatherData.current.feels_like;
        const humidity = weatherData.current.humidity;
        const wind = weatherData.current.wind_speed;
        
        container.innerHTML =   `<h4 id="city-name">${cityName}</h4>
                                <p id="current-temp">${currentTemp} &#8451;</p>
                                <p id="feels-like">Feels Like: ${feelsLike} &#8451;</p>
                                <p id="humidity">Humidity: ${humidity} %</p>
                                <p id="wind">Wind: ${wind} km/h</p>`;

        return container;
    }

    const createHourlyStatsContainer = (hourlyWeatherData) => {
        const container = doc.createElement('div');
        container.classList.add('hourly-weather-data-container','scrollbar-hidden');

        let timeCounter = 0;
        hourlyWeatherData.forEach( (weatherData) => {
            const hourlyWeatherData = doc.createElement('div');
            hourlyWeatherData.classList.add('hourly-weather-data');

            let time;
            if (timeCounter === 0){
                time = "Now";
            }else{
                time = timeCounter;
            }

            hourlyWeatherData.innerHTML =   `<h4 class="hourly-time" data-value="${time}">${time}</h4>
                                            <p class="hourly-temp">${weatherData.temp}&#8451;</p>
                                            <p class="hourly-feels-like">Feels Like: ${weatherData.feels_like}&#8451;</p>`;
            container.appendChild(hourlyWeatherData);

            timeCounter += 1;
        })

        return container;
    }

    const createDailyStatsContainer = (dailyWeatherData) => {
        const date = new Date();

        const container = doc.createElement('div');
        container.classList.add('daily-weather-data-container');

        let index = date.getDay() + 1;
        dailyWeatherData.slice(1,).forEach( (dailyData) => {
            const dailyStat = createDailyStat(index, dailyData);

            if(index >= 6){
                index = -1;
            }

            container.appendChild(dailyStat);
            index+=1;
        });


        return container;
    }

    const createDailyStat = (index, dailyData) =>{
        const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const dailyStat = doc.createElement('div');
        dailyStat.classList.add('daily-stat');

        dailyStat.innerHTML = `<div class="daily-stat">
                                    <p class="daily-day">${weekDay[index]}</p>
                                    <div class="daily-temp-cont">
                                        <p class="daily-temp-title">Temp</p>
                                        <p class="daily-temp">${dailyData.temp.day}&#8451; - ${dailyData.temp.night}&#8451;</p>
                                    </div>
                                    
                                    <div class="daily-chance-of-rain-cont">
                                        <p class="daily-chance-rain-title">Chance Of Rain</p>
                                        <p class="daily-chance-of-rain">${dailyData.pop}%</p>
                                    </div>
                            
                                    <div class="daily-humidity-cont">
                                        <p class="daily-humidity-title">Humidity</p>
                                        <p class="daily-humidity">${dailyData.humidity}%</p>
                                    </div>
                                </div>`;
        return dailyStat;
    }

    const displayNewForecast = (weatherData) => {
        clearInput();
        clearWeatherCurrentStats();

        const weatherDataContainer = doc.createElement('div');
        weatherDataContainer.classList.add('weather-data-container');

        const currentDayWeatherDataContainer = doc.createElement('div');
        currentDayWeatherDataContainer.classList.add('current-day-weather-data-container');
        currentDayWeatherDataContainer.appendChild(createCurrentStatsContainer(weatherData));
        currentDayWeatherDataContainer.appendChild(createHourlyStatsContainer(weatherData.hourly));

        weatherDataContainer.appendChild(currentDayWeatherDataContainer);
        weatherDataContainer.appendChild(createDailyStatsContainer(weatherData.daily));
        

        doc
            .querySelector('.app-container')
            .appendChild(weatherDataContainer);
    }

    const clearInput = () => {
        doc.querySelector('.search-box-input').value = "";
    }

    const clearWeatherCurrentStats = () => {
        try{
            const appContainer = doc.querySelector('.app-container');
            const weatherDataContainer = doc.querySelector('.weather-data-container');

            appContainer.removeChild(weatherDataContainer);
        }catch(err){
            
        }
    }

    const loadUI = () => {
        CONTENT_CONTAINER.appendChild(createNavBar());
        CONTENT_CONTAINER.appendChild(createWeatherAppContainer());
        CONTENT_CONTAINER.appendChild(createFooter());
    }

    return {loadUI, displayNewForecast}
})(document);

export default displayController