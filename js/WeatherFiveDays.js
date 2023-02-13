import {
    WeatherFetch
} from "./weatherFetch.js";

export class WeatherFiveDays {
    constructor() {

        this.weatherDataFetchFiveDays = new WeatherFetch();

        ///names to the icon code///
        this.phenomenonIcon = {
            "01d": "Słonecznie",
            "01n": "Czyste Niebo",
            "02d": "Lekkie Zachmurzenie",
            "02n": "Lekkie Zachmurzenie",
            "03d": "Zachmurzenie",
            "03n": "Zachmurzenie",
            "04d": "Duże Zachmurzenie",
            "04n": "Duże Zachmurzenie",
            "09d": "Deszcz",
            "09n": "Deszcz",
            "10d": "Deszcz",
            "10n": "Deszcz",
            "11d": "Burza",
            "11n": "Burza",
            "13d": "Śnieg",
            "13n": "Śnieg",
            "50d": "Mgła",
            "50n": "Mgła",
        }
        this.details = document.querySelector('.details');

    }

    ///downloading data///
    getDataFromFetchFiveDays() {
        return this.weatherDataFetchFiveDays.getWeatherFetchFiveDays().then((data) => {
            this.weatherDataFiveDays = data;
        });
    }

    weatherFiveDaysFunction() {
        ///clearing previously created items
        this.details.innerHTML = "";

        ///creating 40 html elements with weather data
        for (let i = 0; i < 14; i++) {
            let newSection = document.createElement('section');
            newSection.className = "detailSection";

            for (let x = 0; x < (i === 13 ? 1 : 3); x++) {

                let unixTimesTamp = this.weatherDataFiveDays.list[x + i * 3].dt;
                let date = new Date(unixTimesTamp * 1000);
                let month = (date.getMonth() + 1).toString().padStart(2, "0");
                let day = date.getDate().toString().padStart(2, "0");
                let hours = date.getHours().toString().padStart(2, "0");
                let minutes = date.getMinutes().toString().padStart(2, "0");
                let detailContainer = document.createElement('div');

                detailContainer.className = "detailContainer";
                detailContainer.innerHTML = `
            <div class="timeFive">${day} - ${month} <br> ${hours}:${minutes}</div>
                     <div class="degrees"> temp. ${Math.round(this.weatherDataFiveDays.list[x + i * 3].main.temp)}&#x2103</div>
                     <div class="sensed">odczuwalna ${Math.round(this.weatherDataFiveDays.list[x + i * 3].main.feels_like)}&#x2103</div>
                     <div class="icon"><img src="http://openweathermap.org/img/wn/${this.weatherDataFiveDays.list[x + i * 3].weather[0].icon}@2x.png" alt=""></div>
                     <div class="name">${this.phenomenonIcon[String(this.weatherDataFiveDays.list[x + i * 3].weather[0].icon)]}</div>
                     <div class="wind">Wiatr: ${this.weatherDataFiveDays.list[x + i * 3].wind.speed}m/s</div>
                     <div class="pressure">Ciśnienie: ${this.weatherDataFiveDays.list[x + i * 3].main.pressure}hPa</div>`

                newSection.appendChild(detailContainer);


                this.details.appendChild(newSection);

            }

        }
    }

}