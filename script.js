
//variable that will store server response.
let response ;

//hiding some elements 
document.querySelector('.loading-animation').style.display = 'none';
document.querySelector('.error-text').style.display = 'none';
document.querySelector('.error-display').style.width = '0px';

//function to get the user input location and send a get request to api based on that....
function getWeather(){
    document.querySelector('.error-text').style.display = 'none';
    document.querySelector('.error-display').style.width = '0px';
    document.querySelector('.loading-animation').style.display = 'block';
    document.querySelector('.weather-condition-image').classList.remove('animate-grow');
    const user_input = document.querySelector('.search-input').value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${user_input},uk&APPID=`) //Don't forget to enter your api key...
  .then(response => response.json())
  .then((json) => {
    document.querySelector('.weather-condition-image').classList.remove('animate-grow');
      response = json;
      const weatherImage = document.querySelector('.weather-condition-image');
    weatherImage.classList.add('animate-grow'); // Add animation class
      load_values();
      document.querySelector('.loading-animation').style.display = 'none';
  })
  .catch(error => {
    //if request is not success then show these errors
    console.log("Make sure you entered the API key from OpenWeather...")
    document.querySelector('.loading-animation').style.display = 'none';
    document.querySelector('.error-display').style.width = '300px';
    document.querySelector('.error-text').style.display = 'block';
  });
  ;
}



//whenever user presses enter 
function handleKeyPress(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Call your JavaScript function here
        getWeather();
    }
}

//function to render server response to the page ...
function load_values(){
    set_logo();
    let temperature = response['main']['temp'] - 273.15; //converting kelvin to celcius
    temperature = formatTemperature(temperature);
    const weather_description = response['weather'][0]['description']
    let feels_like = response['main']['feels_like'] - 273.15;
    feels_like = formatTemperature(feels_like);
    const humidity = response['main']['humidity']
    const time_sunrise = sunrise_extractor(); //calculating the sunrise time with function
    const time_sunset = sunset_extractor(); //calculating the sunset time with function
    
    
    //assigning the calculated values to the html page 
    document.querySelector('.weather-temp').textContent = temperature+'°C';
    document.querySelector('.weather-description').textContent = weather_description;
    document.querySelector('.feels-like').textContent = feels_like+'°C';
    document.querySelector('.humidity').textContent = humidity;
    document.querySelector('.sunrise-time').textContent = time_sunrise;
    document.querySelector('.sunset-time').textContent = time_sunset;

}

//calculates sunrise time from response
function sunrise_extractor(){
    const sunriseTimestamp = response['sys']['sunrise'] * 1000;

    // Create Date objects for sunrise and sunset times
    const sunriseDate = new Date(sunriseTimestamp);

    // Output the human-readable date and time
    return sunriseDate.toLocaleTimeString();
}

//calculates sunset time from response
function sunset_extractor(){
    const sunsetTimestamp = response['sys']['sunset'] * 1000;

    // Create Date objects for sunrise and sunset times
    const sunsetDate = new Date(sunsetTimestamp);

    // Output the human-readable date and time
    return sunsetDate.toLocaleTimeString();
}

//limits the length of temperature string
function formatTemperature(temperature){

    // Extract the numerical part of the string and convert it to a floating-point number
    let temperatureValue = parseFloat(temperature);

    // Limit the number to one decimal place
    let formattedTemperature = temperatureValue.toFixed(1);

    return formattedTemperature;
}


//sets the weather condition image corresponding to server response...
function set_logo(){
    const clear = 800;
    const thunderstorm =  [200,201,202,210,211,212,221,230,231,232];
    const drizzle =  [300,301,302,310,311,312,313,314,321];
    const rain = [500,501,502,503,504,511,520,521,522,531];
    const snow = [600,601,602,611,612,613,615,616,620,621,622];
    const clouds = [801,802,803,804];
    weather_id = response['weather'][0]['id'];
    weather_logo = document.getElementById('weather-logo');
    if (clear == weather_id){
        document.body.classList.remove('thunderstorm-sky');
        document.body.classList.remove('drizzle-sky');
        document.body.classList.remove('rain-sky');
        document.body.classList.remove('snow-sky');
        document.body.classList.remove('clouds-sky');
        document.body.classList.remove('haze-sky');
        document.body.classList.remove('clear-sky');
        document.body.classList.add('clear-sky');
        document.getElementById('weather-logo').src = "images/01d.png";
    }
    else if(thunderstorm.includes(weather_id)){
        document.body.classList.remove('thunderstorm-sky');
        document.body.classList.remove('drizzle-sky');
        document.body.classList.remove('rain-sky');
        document.body.classList.remove('snow-sky');
        document.body.classList.remove('clouds-sky');
        document.body.classList.remove('haze-sky');
        document.body.classList.remove('clear-sky');
        document.body.classList.remove('thunderstorm-sky');
        document.body.classList.add('thunderstorm-sky');
        document.getElementById('weather-logo').src = "images/11d.png";
    }
    else if(drizzle.includes(weather_id)){
        document.body.classList.remove('thunderstorm-sky');
        document.body.classList.remove('drizzle-sky');
        document.body.classList.remove('rain-sky');
        document.body.classList.remove('snow-sky');
        document.body.classList.remove('clouds-sky');
        document.body.classList.remove('haze-sky');
        document.body.classList.remove('clear-sky');
        document.body.classList.remove('drizzle-sky');
        document.body.classList.add('drizzle-sky');
        document.getElementById('weather-logo').src = "images/09d.png";
    }
    else if(rain.includes(weather_id)){
        document.body.classList.remove('thunderstorm-sky');
        document.body.classList.remove('drizzle-sky');
        document.body.classList.remove('rain-sky');
        document.body.classList.remove('snow-sky');
        document.body.classList.remove('clouds-sky');
        document.body.classList.remove('haze-sky');
        document.body.classList.remove('clear-sky');
        document.body.classList.remove('rain-sky');
        document.body.classList.add('rain-sky');
        document.getElementById('weather-logo').src = "images/10d.png";
    }
    else if(snow.includes(weather_id)){
        document.body.classList.remove('thunderstorm-sky');
        document.body.classList.remove('drizzle-sky');
        document.body.classList.remove('rain-sky');
        document.body.classList.remove('snow-sky');
        document.body.classList.remove('clouds-sky');
        document.body.classList.remove('haze-sky');
        document.body.classList.remove('clear-sky');
        document.body.classList.remove('snow-sky');
        document.body.classList.add('snow-sky');
        document.getElementById('weather-logo').src = "images/13d.png";
    }
    else if(clouds.includes(weather_id)){
        document.body.classList.remove('thunderstorm-sky');
        document.body.classList.remove('drizzle-sky');
        document.body.classList.remove('rain-sky');
        document.body.classList.remove('snow-sky');
        document.body.classList.remove('clouds-sky');
        document.body.classList.remove('haze-sky');
        document.body.classList.remove('clear-sky');
        document.body.classList.remove('clouds-sky');
        document.body.classList.add('clouds-sky');
        console.log("Code block executed...")
        document.getElementById('weather-logo').src = "images/02d.png";
    }
    else{
        document.body.classList.remove('thunderstorm-sky');
        document.body.classList.remove('drizzle-sky');
        document.body.classList.remove('rain-sky');
        document.body.classList.remove('snow-sky');
        document.body.classList.remove('clouds-sky');
        document.body.classList.remove('haze-sky');
        document.body.classList.remove('clear-sky');
        document.body.classList.remove('haze-sky');
        document.body.classList.add('haze-sky');
        document.getElementById('weather-logo').src = "images/50d.png";
    }
}