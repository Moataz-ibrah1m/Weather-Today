


let currentDay=document.getElementById('currentDay');
let dateNumb=document.getElementById('dateNumb');
let currentMonth=document.getElementById('currentMonth');
let cityName=document.getElementById('cityName');
let currentTemp=document.getElementById('currentTemp');
let currentImg=document.getElementById('currentImg');
let currentCondition=document.getElementById('currentCondition');
let currentHumidity=document.getElementById('currentHumidity');
let currentWind=document.getElementById('currentWind');
let currentDirection=document.getElementById('currentDirection');

let nextDay=document.getElementsByClassName('nextDay');
let nextMaxTemp=document.getElementsByClassName('nextMaxTemp');
let nextMinTemp=document.getElementsByClassName('nextMinTemp');
let nextCondition=document.getElementsByClassName('nextCondition');
let nextConditionImg=document.getElementsByClassName('nextConditionImg')

let serachCity=document.getElementById('search');

async function getWeather(countryLocation)
{
    let weather=  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9673e1e9325d48aea56165904231108&q=${countryLocation}&days=3`);
    let finalWeather= await weather.json()
  
    return finalWeather ;
}




function displayWeather (weatherData)
{

    cityName.innerHTML=weatherData.location.name;
    currentTemp.innerHTML=weatherData.current.temp_c +"<sup>o</sup>C";
    currentImg.setAttribute("src",weatherData.current.condition.icon);
    currentCondition.innerHTML=weatherData.current.condition.text ;
    currentHumidity.innerHTML=weatherData.current.humidity ;
    currentWind.innerHTML=weatherData.current.wind_kph ;
    currentDirection.innerHTML=weatherData.current.wind_dir ;

    let today= new Date()
    currentDay.innerHTML=today.toLocaleDateString("en-Uk",{weekday:"long"})
    currentMonth.innerHTML=today.toLocaleDateString("en-Uk",{month:"long"})
    dateNumb.innerHTML=today.getDate()
}



function displayNextDay(weatherNextData)
{
    let nextData= weatherNextData.forecast.forecastday ;
    for (let i=0 ; i< 2 ; i++)
    {
        let tomorrow= new Date(nextData[i+1].date)
       
        nextDay[i].innerHTML=tomorrow.toLocaleDateString("en-Uk",{weekday:"long"})
        nextMaxTemp[i].innerHTML=nextData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML=nextData[i+1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src",nextData[i+1].day.condition.icon);
        nextCondition[i].innerHTML=nextData[i+1].day.condition.text;
    }

}

async function getData(country = "cairo")
{
    let finalWeather= await getWeather(country);
    displayWeather((finalWeather));
    displayNextDay(finalWeather);
}
getData()

serachCity.addEventListener('keyup', function()
{

    getData(serachCity.value)
})

