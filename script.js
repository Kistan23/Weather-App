let appId = '0929fa95f1ec7e6aa2a9cce5f22681af';
let units = 'metric';
let searchMethod;
//Change Login details here
let userId = 'a';
let password = 'a';

function hideSearchContainer() {
   document.getElementById('searchContainer').style.display = "none";
 }

function showSearchContainer() {
   document.getElementById('searchContainer').style.display = "block";
}

function loginMethod(form) {

  if(form.userId.value == userId && form.password.value == password) {
    showSearchContainer();
  }
    else {
        alert("Error Password or Username")
  }
}

function hideLoginForm() {
  document.getElementById('loginForm').style.display = "none";
}

function getSearchMethod(searchTerm){
  if(searchTerm.length === 5 && searchTerm.parseInt()+ '' ===searchTerm){
    searchMethod = 'zip';
  }else {
    searchMethod = 'q';
  }
}

function searchWeather(searchTerm){
  getSearchMethod(searchTerm);
  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result=>{
    return result.json();
  }).then(result=>{
    init(result);
  });
}

function init(resultFromServer){
  console.log(resultFromServer);
  switch (resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("./img/tiszta.jpg")';
      break;
    case 'Clouds':
      document.body.style.backgroundImage = 'url("./img/felhos.jpg")';
      break;
    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url("./img/eso.jpg")';
      break;
    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("./img/vihar.jpg")';
      break;
    case 'Snow':
      document.body.style.backgroundImage = 'url("./img/ho.jpg")';
      break;
}

  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windspeed');
  let cityIcon = document.getElementById('cityIcon');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.getElementById('documentIconImg');

  weatherIcon.src = 'http://openweathermap.org/img/w/'+ resultFromServer.weather[0].icon + '.png';

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
  windSpeedElement.innerHTML = ' Szel erossege ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML = ' Paratartalom ' + resultFromServer.main.humidity + ' %';

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;
  weatherContainer.style.visibility = 'visible';
}


document.getElementById('searchBtn').addEventListener('click', ()=>{
  let searchTerm = document.getElementById('searchInput').value;
  if(searchTerm){
    searchWeather(searchTerm);
  }
});

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('#weatherContainer').style.display = "none";
});

//Modal
document.querySelector('.addTab').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex';
})

document.querySelector('.shut').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'none';
})

//LoginButton
document.querySelector('.loginOnHeader').addEventListener('click', function() {
  document.querySelector('#loginForm').style.visibility = 'visible';
})
