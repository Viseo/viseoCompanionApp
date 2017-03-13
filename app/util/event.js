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

        this._id = id;
        this._name = name;
        this._description = description;
        this._date = date;
        this._location = location;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    getTime() {
        let hours = new Date(this.date).getHours();
        let minutes = new Date(this.date).getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + "h" + minutes;
    }
}