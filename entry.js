const rootRef = document.getElementById("sun-rise");
const rootTemp = document.getElementById("temp");
import { getUserLocation } from "./location.js";

const loadSpinner = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

async function getWeatherData(latitude, longitude) {
  rootRef.innerHTML = loadSpinner;

  try {
    const data = await getUserLocation();

    const { latitude, longitude } = data.coords;

    const result = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=a2fea60601d0d1dd4349917d7c3b89e2`
    );
    // get own API key and add this to above link to make it work

    const { sunrise } = result.data.sys;
    const humanFormat = new Date(sunrise * 1000);
    rootRef.innerHTML = `The sun will rise at: ${humanFormat.toTimeString()}`;
  } catch (err) {
    rootRef.innerHTML = `Apologies data not available please try again later`;
  }
}

getWeatherData();

async function getTemp() {
  try {
    const locationData = await getUserLocation();

    const { latitude, longitude } = locationData.coords;

    const weatherResult = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=a2fea60601d0d1dd4349917d7c3b89e2`
    );

    const currentTemp = weatherResult.data.main.temp;
    const feelsLike = weatherResult.data.main.feels_like;

    rootTemp.innerHTML = `The current temperature is ${currentTemp}°C, it feels like ${feelsLike}`;
  } catch (err) {
    rootTemp.innerHTML = `Apologies, data not available. Please try again later.`;
  }
}

getTemp();

const locationBtn = document
  .getElementById("location-button")
  .addEventListener("click", getUserLocation());

const searchLocation = document
  .getElementById("location-search")
  .addEventListener("search", function () {});

// const locationBtn = document
//   .getElementById("locationBtn")
//   .addEventListener("click", getWeatherData(), getTemp());
