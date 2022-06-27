function getDataFromForm () {
    const input = document.querySelector('.search-box-input');
    const cityName = input.value;

    if (cityName) {
        return cityName
            .replace(/(\s+$|^\s+)/g, '');
    }

    return '';
}

// Builds request url to obtain coordinates
function buildRequestCoordsUrl (cityName) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=71f7cf9cbec1ab41ed3410c32d172fb2`
}

// Builds request url to obtain weather forecast
function buildRequestForecastUrl (coordinates, unit){
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=${unit}&appid=71f7cf9cbec1ab41ed3410c32d172fb2` 
}

async function getCoords (url) {
    const response = await fetch(url);
    const weatherData = await response.json();
    const { coord } = weatherData;

    coord.name = weatherData.name;
    coord.country = weatherData.sys.country;

    return coord
}

async function getForecast (url) {
    const response = await fetch(url);
    const forecastData = await response.json();

    return forecastData;
}

export {getDataFromForm, buildRequestCoordsUrl, buildRequestForecastUrl, getCoords, getForecast};