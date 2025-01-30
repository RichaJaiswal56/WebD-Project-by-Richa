const inputBox = document.querySelector('.input-box');
const search_btn = document.getElementById('search-btn');
const weather_img = document.querySelector('.weather-img');
const temp = document.querySelector('.temperature');
const descript = document.querySelector('.description');
const humid = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const location_not_found=document.querySelector('.location-not-found');
const weather_body=document.querySelector('.weather-body');

async function weatherCheck(city) {
    const api_key = "d7d19d60d210bafa7ddeb9d338559a2a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response =>
        response.json());


        if(weather_data.cod==`404`){
            location_not_found.style.display="flex";
            weather_body.style.display="none";
        //    console.log("error");
            return;
        }
        else{
            location_not_found.style.display="none";
        }
        
        weather_body.style.display="flex";
    


    // console.log(weather_data)


    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    descript.innerHTML = `${weather_data.weather[0].description}`;
    humid.innerHTML = `${weather_data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "/images/cloud.png";
            break;

        case 'Rain':
            weather_img.src = "/images/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/images/mist.png";
            break;
        case 'Clear':
            weather_img.src = "/images/clear.png";
            break;
            case 'Snow':
            weather_img.src = "/images/snow.png";
            break;

    }
}

search_btn.addEventListener('click', () => {
    weatherCheck(inputBox.value);
});
