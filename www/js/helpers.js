'use strict';

const getDay = (day) => {
    switch (day) {
        case 0:
            return 'Domingo';
        case 1:
            return 'Lunes';
        case 2:
            return 'Martes';
        case 3:
            return 'Miércoles';
        case 4:
            return 'Jueves';
        case 5:
            return 'Viernes';
        case 6:
            return 'Sábado';
    }
};

const getIconWeather = (weather) => {
    switch (weather) {
        case 'Clouds':
            return {
                icon: '<i class="fa-solid fa-cloud"></i>',
                class: 'clouds',
            };

        case 'Clear':
            return {
                icon: '<i class="fa-solid fa-sun"></i>',
                class: 'sunny',
            };

        case 'Rain':
            return {
                icon: '<i class="fa-solid fa-cloud-rain"></i>',
                class: 'rain',
            };

        case 'Snow':
            return {
                icon: '<i class="fa-solid fa-snowflake"></i>',
                class: 'snow',
            };

        case 'Thunderstorm':
            return {
                icon: '<i class="fa-solid fa-cloud-bolt"></i>',
                class: 'thunder',
            };

        case 'Drizzle':
            return {
                icon: '<i class="fa-solid fa-cloud-sun-rain"></i>',
                class: 'rain-dog',
            };

        default:
            return {
                icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
                class: 'default',
            };
    }
};

export { getDay, getIconWeather };
