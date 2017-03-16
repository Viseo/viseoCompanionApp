/**
 * Created by AAB3605 on 20/02/2017.
 */

export default class Event {
    constructor(
        id,
        name,
        description,
        date,
        location
    ) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
    }

    getTime = () => {
        if(!this.date)
            return 0;
        let hours = new Date(this.date).getHours();
        let minutes = new Date(this.date).getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + "h" + minutes;
    }

    getDateToString = () => {
        if(!this.date)
            return 0;
        let dateTime = new Date(this.date);
        let date = '';
        let time = '';

        let day  = dateTime.getDay();
        let month = dateTime.getMonth();
        let year = dateTime.getYear();
        if (dateTime === Date.now()){
            day = month = year = '';
        } else if (year === Date.now.getYear()) {
            year = '';
        }
        date = day;

        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        } else if (minutes === 0) {
            minutes = '';
        }
        time = hours + 'h' + minutes;
        return hours + "h" + minutes;
    }
}