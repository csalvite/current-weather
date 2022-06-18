'use strict';

/**
 * Esta es una aplicacion chorras del tiempo hecha con Vanilla JS
 */

// Primero deberíamos recuperar la api key
import { apiKey } from './config.js';
import { getDay, getIconWeather } from './helpers.js';

// Recuperamos los elementos del html necesarios

const body = document.querySelector('body');
const title = document.querySelector('header > h1');
const iconWeather = document.querySelector('section#icon-weather');
const weatherInfo = document.querySelector('section#weather-info');
const h2Data = weatherInfo.querySelector('h2');
const h3Temperature = weatherInfo.querySelector('h3');
const h4Description = weatherInfo.querySelector('h4');
const pWind = weatherInfo.querySelector(
    'div > div:first-of-type p:last-of-type'
);
const pHumidity = weatherInfo.querySelector(
    'div > div:last-of-type p:last-of-type'
);

// URL datos
const urlAPI = `https://api.openweathermap.org/data/2.5/weather`;

// Funcion que llama a la api y recoje los datos
async function getApiData(url) {
    const response = await fetch(url);

    const data = await response.json();

    return data;
}

// Mostramos los datos por pantalla
async function main(url) {
    try {
        const weatherData = await getApiData(url);

        // Destructuring para obtener las propiedades necesarias
        const { weather, main, name, wind } = weatherData;

        // Recuperamos el nombre de clase e icono correspondientes al tiempo actual
        const objIconBackground = getIconWeather(weather[0].main);

        // Establecemos la clase que da el fondo de la pagina segun el weather[0].main
        if (body.classList.contains(objIconBackground.class)) {
            body.classList.remove(objIconBackground.class);
        } else {
            body.classList.add(objIconBackground.class);
        }

        // Establecemos titulo
        title.textContent = `${name}`;

        // Segun la descripcion del tiempo indicamos un icono
        iconWeather.innerHTML = `${objIconBackground.icon}`;

        // Fecha actual
        const now = new Date();

        // Establecemos la fecha actual
        h2Data.textContent = `${getDay(
            now.getDay()
        )} ${now.toLocaleDateString()}`;

        // Indicamos primera letra del string recibido de weather en mayuscula
        const descriptionWeather =
            weather[0].description[0].toUpperCase() +
            weather[0].description.substring(1);

        // Temperatura
        h3Temperature.textContent = `${Math.round(main.temp)}°`;

        // Establecemos description tiempo
        h4Description.textContent = `${descriptionWeather}`;

        // Velocidad del viento
        pWind.textContent = `${wind.speed} km/h`;

        // Humedad
        pHumidity.textContent = `${main.humidity}%`;
    } catch (error) {
        console.error(error);
    }
}

// Guardamos nuestra ubicacion
const objPosition = {};
let urlApi = '';

navigator.geolocation.getCurrentPosition(
    (position) => {
        objPosition.lat = position.coords.latitude;
        objPosition.lon = position.coords.longitude;

        // Si nos permite conocer su ubicación la mostraremos, si no, por defecto aparecerá la info de A Coruña
        const lat = objPosition.lat ? objPosition.lat : '43.3715';
        const lon = objPosition.lon ? objPosition.lon : '-8.39597';

        // Completamos la url
        urlApi =
            urlAPI +
            `?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

        // Llamada a la funcion principal
        main(urlApi);
    },
    (error) => {
        console.error(error);
    }
);
