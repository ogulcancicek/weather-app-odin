import displayController from "./displayController";
import * as APIController from './apiController';

displayController.loadUI();

const searchBtn = document.querySelector('.location-search-btn');

const input = document.querySelector('.search-box-input');

searchBtn.addEventListener('click', getWeatherData);

input.addEventListener('keypress', function(e) {
    if (e.key === "Enter"){
        e.preventDefault();
        searchBtn.click();
    }
})

async function getWeatherData(){
    try {
        let cityName = APIController.getDataFromForm();
        
        if (!cityName){
            return;
        }

        // get coords of searched city
        const requestCoordsUrl = APIController.buildRequestCoordsUrl(cityName);
        const coords = await APIController.getCoords(requestCoordsUrl);

        // get weather data of searched city
        const requestForecastUrl = APIController.buildRequestForecastUrl(coords, 'metric');
        const weatherData = await APIController.getForecast(requestForecastUrl);

        weatherData.name = coords.name;
        weatherData.country = coords.country;;

        displayController.displayNewForecast(weatherData);
    } catch (error) {
        console.log(error);
        alert('Something went wrong, please try again later!!')
    }
}