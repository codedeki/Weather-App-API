//dom selectors
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast(); //create new instance of class object to use it


const updateUI = (data) => {
    
    // console.log(data);
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    //OR destructure properties
    const { cityDetails, weather } = data; // get data from city dets and store in citydets, get data in weather and store in weather

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
    `;

    //update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    
    let timeSrc = null;
    if(weather.IsDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg'
    }
    //OR ternary operator
    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    
    time.setAttribute('src', timeSrc);


    //remove the d-none class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

//don't need this anymore since stored in class Forecast
// const updateCity = async (city) => {
//     //asynchronous functions 
//     const cityDetails = await getCity(city); //wait until getcity is finished 
//     const weather = await getWeather(cityDetails.Key); //wait until getweather is finished, gets api Key from getWeather function

//     //if property name and value is the same, we can do object shorthand:
//     return {
//         cityDetails,
//         weather
//     };
//     return {
//         cityDetails: cityDetails,
//         weather: weather
//     };
// };

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city) //add forecast here from class constructor
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage

    localStorage.setItem('city', city); //sets a value named city, gets the above const city

});

//see if item exists in local storage

if(localStorage.getItem('city')) { //add forecast class from class constructor
   forecast.updateCity(localStorage.getItem('city')) //run updateCity if there's local storage typed into city value in the eventlistener
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}