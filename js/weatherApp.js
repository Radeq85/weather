import {
    WeatherFetch
} from "./weatherFetch.js";
import {
    WeatherFiveDays
} from "./WeatherFiveDays.js";
import {
    WeatherMain
} from "./WeatherMain.js";



export class WeatherApp {
    constructor() {
        this.WeatherFetch = new WeatherFetch();
        this.WeatherMain = new WeatherMain();
        this.WeatherFiveDays = new WeatherFiveDays();


        this.btn = document.querySelector('.searchIcon').addEventListener('click', this.start.bind(this));
        this.citySearch = document.querySelector('.searchCity').addEventListener('keypress', this.startEnter.bind(this));



    }

    startEnter(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            this.start();
        }



    }

    start() {

        this.WeatherFetch.getWeatherFetch();
        this.WeatherFetch.getWeatherFetchFiveDays();


        this.WeatherMain.getDataFromFetch().then(() => this.WeatherMain.weatherFunction());
        this.WeatherFiveDays.getDataFromFetchFiveDays().then(() => this.WeatherFiveDays.weatherFiveDaysFunction());


    }
}