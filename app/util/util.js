/**
 * Created by AAB3605 on 16/02/2017.
 */

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

export function truncate(text, maxLength) {
    if (text.length > maxLength) {
        text = text.substr(0, maxLength);
    }
    return text;
}