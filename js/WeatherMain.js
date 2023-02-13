import {
    WeatherFetch
} from "./weatherFetch.js";
////main weather window////
export class WeatherMain {

    constructor() {
        this.weatherDataFetch = new WeatherFetch();
        this.phenomenon = document.querySelector('.phenomenonSpan');
        this.phenomenonGraphic = document.querySelector('.phenomenonGraphic');
        this.temp = document.querySelector('.mainTemp');
        this.location = document.querySelector('.location');
        this.bgdColor = document.querySelector('.container');


    }
    ///downloading data///
    getDataFromFetch() {
        return this.weatherDataFetch.getWeatherFetch().then((data) => {
            this.weatherData = data;
        });
    }

    weatherFunction() {
        let WeatherShowData = this.weatherData;

        ////time to determine day/night for atmospheric phenomena///
        let now = new Date();
        const utcTime = now.getTimezoneOffset() * 60;
        let dateSunrise = new Date(((WeatherShowData.sys.sunrise + utcTime) + WeatherShowData.timezone) * 1000);
        let dateSunset = new Date(((WeatherShowData.sys.sunset + utcTime) + WeatherShowData.timezone) * 1000);
        let localTime = new Date((now.getTime() / 1000 + WeatherShowData.timezone + (now.getTimezoneOffset() * 60)) * 1000);

        ////location and temperature///
        this.location.innerHTML = `${WeatherShowData.name}, ${WeatherShowData.sys.country}`;
        this.temp.innerHTML = `${Math.round(WeatherShowData.main.temp)}&#x2103`;

        ////weather code retrieval///
        let WeatherCode = WeatherShowData.weather[0].id;
        let WeatherCodeSplit = WeatherShowData.weather[0].id + "";


        ////depending on the weather code, the creation of atmospheric phenomena/////
        if (WeatherCodeSplit === "800") {


            if (dateSunrise > localTime || dateSunset < localTime) {
                this.phenomenon.innerHTML = "Czyste Niebo"
                this.phenomenonGraphic.innerHTML = `<div class="moon"></div>`
            } else {
                this.phenomenon.innerHTML = "Słonecznie"
                this.phenomenonGraphic.innerHTML = `<div class="sun"></div>`
            }

            this.colorValue = "#FF7598";

            this.bgdColor.style.background = this.colorValue;

        } else if (WeatherCodeSplit[0] === "2") {
            this.colorValue = "#787CBF";

            this.phenomenon.innerHTML = "Burza";
            this.bgdColor.style.background = this.colorValue;
            this.phenomenonGraphic.innerHTML = `<div class="cloudThunder"></div><div class="thunderContainer">
            <div class="thunder"></div>
        </div>`;

        } else if (WeatherCodeSplit[0] === "3" || WeatherCodeSplit[0] === "5") {
            if (WeatherCodeSplit[0] === "3") {
                this.phenomenon.innerHTML = "Mżawka";
            } else {
                this.phenomenon.innerHTML = "Deszcz";
            }
            this.colorValue = "#1d91be";


            this.bgdColor.style.background = this.colorValue;
            this.phenomenonGraphic.innerHTML =
                `<div class="cloudRain"></div>
                <div class="containerRain">
                <span class="stream1"></span>
                <span class="stream2"></span>
                <span class="stream3"></span>
            </div>`

        } else if (WeatherCodeSplit[0] === "6") {

            this.colorValue = "#4D5C64";


            this.phenomenon.innerHTML = "Śnieg";
            this.bgdColor.style.background = this.colorValue;
            this.phenomenonGraphic.innerHTML = `
            <div class="cloudSnow"></div>
            <div class="snow">
                <div class="snow1"></div>
                <div class="snow2"></div>
                <div class="snow3"></div>
                <div class="snow4"></div>
            </div>`

        } else if (WeatherCodeSplit[0] === "8" && WeatherCodeSplit[2] === "1") {
            this.colorValue = "#589A8D";


            this.phenomenon.innerHTML = "Lekkie Zachmurzenie";
            this.bgdColor.style.background = this.colorValue;

            if (dateSunrise > localTime || dateSunset < localTime) {

                this.phenomenonGraphic.innerHTML = `<div class="moonCloudScattered"></div>
                <div class="cloudContainer">
                    <div class="cloudScattered"></div>
                </div>`
            } else {
                this.phenomenonGraphic.innerHTML = `<div class="sunCloudScattered"></div>
                <div class="cloudContainer">
                    <div class="cloudScattered"></div>
                </div>`
            }


        } else if (WeatherCodeSplit[0] === "8" && (WeatherCodeSplit[2] === "2" || WeatherCodeSplit[2] === "3")) {
            this.colorValue = "#589A8D";


            this.phenomenon.innerHTML = "Zachmurzenie";
            this.bgdColor.style.background = this.colorValue;
            if (dateSunrise > localTime || dateSunset < localTime) {

                this.phenomenonGraphic.innerHTML = `<div class="moonCloudMedium"></div>
                <div class="cloudMediumContainer">
                    <div class="cloudMedium"></div>
                </div>
                <div class="cloudMediumContainer2">
                    <div class="cloudMedium"></div>
                </div>`
            } else {
                this.phenomenonGraphic.innerHTML = `<div class="sunCloudMedium"></div>
                <div class="cloudMediumContainer">
                    <div class="cloudMedium"></div>
                </div>
                <div class="cloudMediumContainer2">
                    <div class="cloudMedium"></div>
                </div>`
            }


        } else if (WeatherCodeSplit[0] === "8" && WeatherCodeSplit[2] === "4") {
            this.colorValue = "#027373";


            this.phenomenon.innerHTML = "Duże Zachmurzenie ";
            this.bgdColor.style.background = this.colorValue;
            this.phenomenonGraphic.innerHTML = `
            <div class="cloudHeavyContainer">
            <div class="cloudHeavy"></div>
        </div>
        <div class="cloudHeavyContainer2">
            <div class="cloudHeavy"></div>
        </div>
        <div class="cloudHeavyContainer3">
            <div class="cloudHeavy"></div>
        </div>
        <div class="cloudHeavyContainer4">
            <div class="cloudHeavy"></div>
        </div>`

        } else {
            this.colorValue = "#0E4459";


            const AtmosphereGroup = {
                "701": "mgła",
                "711": "mgła",
                "721": "mgła",
                "731": "Burza Piaskowa",
                "741": "mgła",
                "751": "Burza Piaskowa",
                "761": "Burza Piaskowa",
                "762": "Popiół Wulkaniczny",
                "771": "Szkwał",
                "781": "Tornado"
            };

            if (WeatherCode in AtmosphereGroup) {
                this.phenomenon.innerHTML = AtmosphereGroup[WeatherCode];
                this.bgdColor.style.background = this.colorValue;
                this.phenomenonGraphic.innerHTML = `
                <div class="cloudMist"></div>
                <div class="containerMist">
                    <span class="mist1"></span>
                    <span class="mist2"></span>
                    <span class="mist3"></span>
                </div>`
            }

        }



    }


}