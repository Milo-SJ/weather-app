const rootRef = document.getElementById("sun-rise");
const rootTemp = document.getElementById("temp");
const rootIcon = document.getElementById("icon");
const schema = {
  location: Joi.string().min(2),
};
import { getUserLocation } from "./location.js";

const loadSpinner = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

async function getWeatherData(latitude, longitude) {
  rootRef.innerHTML = loadSpinner;

  try {
    if (!latitude || !longitude) {
      const locationData = await getUserLocation();
      // console.log("if block ran", locationData.coords.longitude);
      latitude = locationData.coords.latitude;
      longitude = locationData.coords.longitude;
    }

    const result = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=a2fea60601d0d1dd4349917d7c3b89e2`
    );
    // get own API key and add this to above link to make it work
    // const placeName = result.data.name;
    const { sunrise, sunset } = result.data.sys;
    const locationName = result.data.name;
    const humanFormat = new Date(sunrise * 1000);
    const humanFormatSunSet = new Date(sunset * 1000);
    rootRef.innerHTML = `The sun will rise in ${locationName}  at: ${humanFormat.toTimeString()} and set at: ${humanFormatSunSet.toTimeString()}`;
  } catch (err) {
    rootRef.innerHTML = `Apologies data not available please try again later`;
  }
}

getWeatherData();

async function getTemp(lat, lon) {
  let latitude = lat,
    longitude = lon;

  try {
    if (!latitude || !longitude) {
      const locationData = await getUserLocation();
      // console.log("if block ran", locationData.coords.longitude);
      latitude = locationData.coords.latitude;
      longitude = locationData.coords.longitude;
    }

    const weatherResult = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=a2fea60601d0d1dd4349917d7c3b89e2`
    );
    console.log(weatherResult);
    const currentTemp = weatherResult.data.main.temp;
    const minTemp = weatherResult.data.main.temp_min;
    const maxTemp = weatherResult.data.main.temp_max;
    const feelsLike = weatherResult.data.main.feels_like;
    const weatherDescription = weatherResult.data.weather[0].description;
    const icon = weatherResult.data.weather[0].icon;
    rootTemp.innerHTML = `The current temperature is ${currentTemp}°C with a low of ${minTemp}°C and a high of ${maxTemp}°C. It feels like ${feelsLike}°C, currently ${weatherDescription}`;
    rootIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt=""/>`;
  } catch (err) {
    rootTemp.innerHTML = `Apologies, data not available. Please try again later.`;
  }
}

getTemp();

const locationBtn = document
  .getElementById("location-button")
  .addEventListener("click", async function (e) {
    const result = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=a2fea60601d0d1dd4349917d7c3b89e2`
    );
    getTemp();
    // getWeatherData();
  });

const searchLocation = document
  .getElementById("location-search")
  .addEventListener("input", async function (e) {
    const result = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&limit=1&appid=a2fea60601d0d1dd4349917d7c3b89e2`
    );
    const { lat, lon, name } = result.data[0];
    getTemp(result.data[0].lat, result.data[0].lon);
    console.log(result.data, result.data[0]);

    getWeatherData(lat, lon, name);
    console.log(getWeatherData);
  });
// add validation to the above
