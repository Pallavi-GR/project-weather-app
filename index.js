let now = new Date();
let currentDate = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getUTCFullYear();

let date = document.querySelector("li#date");
date.innerHTML = `${currentDay}, ${currentDate}th ${currentMonth}, ${currentYear}`;

let time = document.querySelector("li#time");
time.innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} HRS`;

let apiKey = "cf3e506438214bee7911d63659fba7fa";

function search(city) {
  //navigator.geolocation.getCurrentPosition(handlePosition);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showTemp);
}

//search("darmstadt");

navigator.geolocation.getCurrentPosition(handlePosition); // call for current location.

function handlePosition(position) {
  // gets latitude and logitude
  let latitude = position.coords.latitude;
  console.log(`Latitude: ${latitude}`);
  let longitude = position.coords.longitude;
  console.log(`Longitude: ${longitude}`);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showPosition);
}

function showPosition(response) {
  // gets the corresponding city name and calls the function for displaying the weather details.
  if (navigator.geolocation) {
    let city = response.data.name;
    console.log(response.data.name);
    //let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    search(city);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showTemp(response) {
  console.log(response.data);
  let cityName = response.data.name;
  console.log(`Temperature in ${cityName} is ${response.data.main.temp}`);
  console.log(cityName);
  let temperature = Math.round(response.data.main.temp);
  let placeElement = document.querySelector("#place");
  let temperatureElement = document.querySelector("#temp");
  let description = document.querySelector("#temperature-description");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  displayForecast();

  placeElement.innerHTML = `${cityName}`;
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = ` ${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  windElement.innerHTML = `Wind: ${response.data.wind.speed} KM/HR`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} % `;

  let tempChange = document.querySelector("#celcius");
  tempChange.addEventListener("click", cel);

  function cel(event) {
    event.preventDefault();
    let tempCel = document.querySelector("#temp");
    tempCel.innerHTML = `${temperature}`;
  }

  let tempChange2 = document.querySelector("#farh");
  tempChange2.addEventListener("click", farh);

  function farh(event) {
    let tempFarh = document.querySelector("#temp");
    let tempFarenheit = Math.round((temperature * 9) / 5 + 32);
    tempFarh.innerHTML = `${tempFarenheit}`;
  }
}

let submitBtn = document.querySelector("#submitButton");
submitBtn.addEventListener("click", searchPosition);

function searchPosition(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#placeSearch");
  let city = searchValue.value;
  console.log(city);
  search(city);
}

let submitBtn2 = document.querySelector("#currentLocation");
submitBtn2.addEventListener("click", search2);

function search2(position) {
  navigator.geolocation.getCurrentPosition(handlePosition);
  //search("darmstadt");
}

function timeDisplay() {
  var now = new Date();
  var hours = now.getHours();
  var ft = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  if (5 <= hours && hours < 8) {
    //Morning
    document.write(
      '<body style="background: #F3904F; background: radial-gradient(circle at 10% 20%, rgb(254, 255, 165) 0%, rgb(255, 232, 182) 90%); opacity:0.7; color: black">'
    );
    var type = "Morning";
  }
  if (8 <= hours && hours < 17) {
    //Day time
    document.write(
      '<body style="background: #00B4DB; background: linear-gradient(108.1deg, rgb(167, 220, 225) 11.2%, rgb(217, 239, 242) 88.9%); opacity:0.7; color: black">'
    );
    var type = "Daytime";
  }

  if (17 <= hours && hours < 20) {
    //Evening
    document.write(
      '<body style="background: #355C7D; background: linear-gradient(103deg, rgb(235, 225, 188) 7.2%, rgb(232, 188, 234) 57.5%, rgb(203, 209, 244) 90.7%); opacity:0.7; \ncolor: black">'
    );
    var type = "Evening";
  }

  if (20 <= hours && hours <= 24 && hours < 5) {
    //Night
    document.write(
      '<body style="background: #0f2027; background: radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%); opacity:0.8; \ncolor : white">'
    );
    var type = "Nighttime";
  }
}
timeDisplay();

function displayForecast() {
  let forecastElement = document.querySelector("#ff");
  let forecastHTML = `<div class = "row">`;
  forecastHTML =
    forecastHTML +
    `
    <div class="future-Forecast" id="ff">
        <div class = "col-2">
          <div class="ff-date">
              Thu
          </div>
          <img
              src="http://openweathermap.org/img/wn/50d@2x.png"
              alt="icon" width="42"
              id="icon"
          />
          <div class="ff-temp>
              <span class = "ff-maxTemp">18° </span> 
              <span class="ff-minTemp">12°</span>
          </div>
          
        </div>
    </div>
      `;
  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

//add last modified
