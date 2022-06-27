'use strict';

//api key
const API_KEY = 'afd51930a896ea1e707d4e83f8e59cfa'

//llamado
document.querySelector("#button").addEventListener('click', searchCity);


//arreglo global
let cities = [];

async function searchCity(e) {
    try {
        e.preventDefault();

        let form = document.querySelector("#form");
        let formData = new FormData(form);
        let city = formData.get("city");
        let weatherCities = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        let apiInfo = await weatherCities.json();


        let infoCities = {

            name: apiInfo.name,
            weather: apiInfo.weather.map((element) => {
                return {
                    main: element.main,
                    description: element.description,
                }
            }),

            lat: apiInfo.coord.lat,
            lon: apiInfo.coord.lon,

            temp: apiInfo.main.temp
        }
        cities.push(infoCities);
        mostrar();
    }
    catch (error) {
        console.log(error);
        document.querySelector("#show").innerHTML = "<p>Country not found</p>";
    }

}

function mostrar() {
    let btn = document.querySelectorAll("#delete");
    console.log(btn)
    btn.forEach(element => {
        console.log(element)
    });
    document.querySelector("#show").innerHTML = "";
    for (let index = 0; index < cities.length; index++) {
        document.querySelector("#show").innerHTML += `<button id="delete">x</button>
        <p>name:${cities[index].name}</p>
        <p>main:${cities[index].weather[0].main}</p>
        <p>description:${cities[index].weather[0].description}</p>
        <p>lat:${cities[index].lat}</p>
        <p>lon:${cities[index].lon}</p>
        <p>temp:${cities[index].temp}</p>`

    }
}

