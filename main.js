const api = {
    key: "54210c6cbeb2f6e8818d9c9e8e12aa0d",
    base: "https://api.openweathermap.org/data/2.5/"

    //base: "https://api.openweathermap.org/data/2.5/weather?q=mumbai&units=metric&appid=54210c6cbeb2f6e8818d9c9e8e12aa0d"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event){
    if(event.keyCode == 13){
        //Enter key
        getResults(searchBox.value);
    }
}

function getResults(city){
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(weather=>{
            return weather.json();
        }).then(response=>{
            console.log(response);
            displayResults(response);
        });

}

function displayResults(response){
    let city = document.querySelector('.location .city');
    city.innerText = `${response.name}, ${response.sys.country}`;

    let now = new Date();
    console.log(now);
    let myDate = document.querySelector('.location .date');

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(response.main.temp)} <span>°c</span>`;

    let weather = document.querySelector('.current .weather');
    weather.innerText = response.weather[0].main;

    let highLow = document.querySelector('.current .hi-low');
    highLow.innerText =  `${Math.round(response.main.temp_min)} °c / ${Math.round(response.main.temp_max)} °c`


    myDate.innerText = dateBuilder(now);
}

function dateBuilder(dt){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let day, date, month, year;

    day = days[dt.getDay()];
    month = months[dt.getMonth()]
    year = dt.getFullYear();
    date = dt.getDate();

    return `${date} ${day} ${month} ${year} `;
}