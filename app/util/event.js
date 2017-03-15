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
}