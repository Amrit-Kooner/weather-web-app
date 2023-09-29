const KEY = "863b71f080b6986c26a143b653f04134"; 
// TODO: HIDE KEY
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric?&q=";

// ---------------------------------------------------------------------------------------

const container = document.querySelector(".container");
const seachInput = document.querySelector(".search input")
const optionInput = document.querySelector(".country-select");

function updateImage(weather){
    const imgElement = document.querySelector(".weather-img");

    switch(weather){
        case "Sunny":
            imgElement.src = "/img/sun.svg";
            break;
        case "Rain":
            imgElement.src = "/img/rain.svg";
            break;
        case "Clear":
            imgElement.src = "/img/clear.svg";
            break;
        case "Clouds":
            imgElement.src = "/img/clouds.svg";
            break;
        case "Mist":
            imgElement.src = "/img/mist.svg";
            break;
        case "Drizzle":
            imgElement.src = "/img/drizzle.svg";
            break;
        case "Snow":
            imgElement.src = "/img/snow.svg";
            break;
        case "Thunderstorm":
            imgElement.src = "/img/thunderstorm.svg";
            break;   
    }
}

function updateUI(data){
    const {name, sys:{country}, wind:{speed}, main:{temp, humidity}} = data;
    const weatherData = data.weather[0];

    document.querySelector(".weather").innerHTML = weatherData.main;
    document.querySelector(".city").innerHTML = name;
    document.querySelector(".country").innerHTML = country;
    document.querySelector(".desc").innerHTML = weatherData.description;
    document.querySelector(".temp-value").innerHTML = `${Math.round(temp - 273.15)}°C`;
    document.querySelector(".humidity-value").innerHTML = `${Math.round(humidity)}%`;
    document.querySelector(".wind-speed-value").innerHTML = `${speed} MPH`;

    updateImage(weatherData.main);
}

async function fetchData(cityArg, countryArg){
    try {
        const response = await fetch(`${URL}${cityArg},${countryArg}&appid=${KEY}`);

        if(!response.ok || response.status === 404){
            alert("Please enter a valid Location!")
            throw new Error("ERROR OCCURED FETCHING API DATA") 
        }
        return await response.json();

    } catch(error) {
        console.error(`ERROR OCCURED: ${error}`)
    }
}

async function getWeather(cityArg, countryArg){
    const data = await fetchData(cityArg, countryArg);

    updateUI(data);

    container.style.display = "block";
}

document.querySelector(".submit-btn").addEventListener("click", () => {
    const inputValue = seachInput.value;
    const optionValue = optionInput.value;

    if(inputValue == "") {
        alert("Please choose a City!");
    } else if(optionValue == ""){
        alert("Please enter a Country!");
    } else{
        getWeather(inputValue, optionValue);
    }
});

document.querySelector(".clear-btn").addEventListener("click", () => {
    container.style.display = "none";
    seachInput.value = "";
    optionInput.value = "";
});