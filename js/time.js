export class Time {
    constructor() {
        this.time = document.querySelector('.time');
        this.date = new Date();
        this.months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        this.days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

    }
    showDate() {
        this.currentyMonth = this.months[this.date.getMonth()];
        this.currentyDay = this.days[this.date.getDay()];
        this.currentyDate = this.date.getDate();

        return this.time.textContent = `${this.currentyMonth} ${this.currentyDate} ${this.currentyDay}`
    }

}