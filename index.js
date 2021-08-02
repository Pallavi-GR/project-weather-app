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

function search(city) {
  //navigator.geolocation.getCurrentPosition(handlePosition);
  let apiKey = "cf3e506438214bee7911d63659fba7fa";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showTemp);
}

search("darmstadt");

function showTemp(response) {
  // event.preventDefault();
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

function searchPosition(position) {
  let searchValue = document.querySelector("#placeSearch");
  console.log(searchValue.value);
  let city = searchValue.value;
  search(city);
}

//let submitBtn2 = document.querySelector("#currentLocation");
//submitBtn2.addEventListener("click", search2);

//function search2(position) {
//search("darmstadt");
//}

//add last modified
