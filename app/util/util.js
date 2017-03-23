/**
 * Created by AAB3605 on 16/02/2017.
 */
import strings from "./localizedStrings";
const hoursInAWeek = 168;
const milliSecondsInAnHour = 3600000;

export function hasEmptyElement() {
    for(let i = 0; i < arguments.length; i++) {
        if(!arguments[i] || arguments[i] == '')
            return true;
    }

    return false;
}

export function isEmailValid(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

export function isPasswordValid(password) {
    return password.length >= 6 ? true : false;
}

export function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export function getFormattedHour(date){
    return this.addZero(new Date(date).getHours()) + "h" + this.addZero(new Date(date).getMinutes());
}

export function getFormattedDate(date){
    return new Date(date).getDate()+ "/" + this.addZero(new Date(date).getMonth() + 1)+ "/" + new Date(date).getFullYear();
}

export function getDayName(date){
    let dayIndex = new Date(date).getDay();
    return strings.days[dayIndex];
}

export function isDateInThisWeekNextDays(date){
    let hoursToEvent = (new Date(date).getTime() - Date.now()) / milliSecondsInAnHour;
    return hoursToEvent > 0 ? hoursToEvent < hoursInAWeek : false;
}