/**
 * Created by AAB3605 on 20/02/2017.
 */

import moment from 'moment';

export default class Event {
    constructor(
        id,
        name,
        description,
        date,
        location,
        category
    ) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.category = category
    }

    getDateToString = () => {
        if(!this.date)
            return null;
        let dateTime = moment(this.date);
        return dateTime.calendar();
    }
}