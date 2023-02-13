////downloading data////

export class WeatherFetch {

    constructor() {
        this.citySearch = document.querySelector('.searchCity');
    }
    getWeatherFetch() {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.citySearch.value}&appid=6a992e023ce1d05f925588a6d549bbb6&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                return data
            });
    }

    getWeatherFetchFiveDays() {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.citySearch.value}&appid=6a992e023ce1d05f925588a6d549bbb6&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                return data
            });
    }
}