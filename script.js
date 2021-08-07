const button = document.querySelector("#clicky_thing");
const input = document.querySelector("#textbox");
const output = document.querySelector("#output");

const proxy = "https://cors-anywhere.herokuapp.com/";
const url = proxy + "https://www.metaweather.com/api/location/search/?query=";
const url2 = proxy + "https://www.metaweather.com/api/location/";

button.addEventListener("click", handler);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handler();
  }
});

function handler() {
  const userInput = input.value;
  input.value = "";
  output.innerHTML = "Loading...";
  fetch(url + userInput)
    .then((blob) => blob.json())
    .then((data) => {
      const city = data[0];
      const woeid = city.woeid;
      fetch(url2 + woeid)
        .then((blob) => blob.json())
        .then((cityData) => {
          const weatherData = cityData.consolidated_weather[0];

          const highTemp = Math.round(toFarenheit(weatherData.max_temp));
          const lowTemp = Math.round(toFarenheit(weatherData.min_temp));
          const weatherState = weatherData.weather_state_name;
          output.innerHTML = `
            High: ${highTemp}°F<br>
            Low: ${lowTemp}°F<br>
            Weather: ${weatherState}
          `;
        });
    })
    .catch((error) => {
      console.log(error);
      output.innerHTML = "Something went wrong!";
    });
}

function toFarenheit(celcius) {
  return celcius * 1.8 + 32;
}
