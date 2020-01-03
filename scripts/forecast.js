//rewrite everything below + updatecity in app.js using CLASS constructor
class Forecast {
    constructor() {
        this.key = 'empty for github';
        this.weatherURI = 'http link goes here'; //base
        this.cityURI = 'http link goes here'
    }
    async updateCity(city) {
        const cityDetails = await this.getCity(city); 
        const weather = await this.getWeather(cityDetails.Key); 
        return { cityDetails,weather };
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.weatherURI + query); 
        const data = await response.json(); 
        return data[0];
    }
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`; 
        const response =  await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}


// ---------------------------------------------------------------------------
const key = 'empty for github'; //api key from weather api website

//get weather information

const getWeather = async (id) => {
    const base = 'http link goes here';
    const query = `${id}?apikey=${key}`; //id refers to city Key from data[0], api key is key
    //apikey is a query paramater so starts with ?
    const response =  await fetch(base + query);
    const data = await response.json();
    
    return data[0];
};

getWeather("329400"); // city name key is a number

//get endpoint url, city information
const getCity = async (city) => { //async b/c returns a promise, pass or fail

    const base = 'an http link goes here';
    const query = `?apikey=${key}&q=${city}`; //api key and query go here; q is query param, ? starts a query paramater, & for next query param, = to set value

    const response = await fetch(base + query); //returns and resolves promise and passes into constant response
    const data = await response.json(); //to read the file

    return data[0]; //get closest match in array, so use 0, we need to look for Key value which matches the city in the array, so we can use this key to make second request which will be current weather conditions of the location
};

//this goes in app.js
// getCity('manchester') //get a city 
//     .then(data => {
//         return getWeather(data.Key); //returns a promise
//     }).then(data => {
//         console.log(data);
//     }).catch(err => console.log(err)); //catch if error
