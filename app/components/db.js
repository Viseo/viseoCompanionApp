/**
 * Created by AAB3605 on 16/02/2017.
 */
import settings from '../config/settings';
import Event from './event';

export async function addUser(email, password) {
    try {
        let response = await fetch(settings.SERVER_API_URL + 'account/addAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

        let responseJson = await response.json();
        if(responseJson) {
            return true;
        }
    } catch (error) {
        console.warn(error);
    }

    return false;
}

export async function checkCredentials(email, password) {
    try {
        let response = await fetch(settings.SERVER_API_URL + 'account/Authentification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });

        let responseJson = await response.json();
        if(responseJson) {
            return true;
        }
    } catch (error) {
        console.warn(error);
    }

    return false;
}

export async function getEvents() {
    try {
        let response = await fetch(settings.EVENT_API_URL + '/readEvent');
        let eventsJson = await response.json();

        let events = [];
        for (let i = 0; i < eventsJson.length; i++){
            let event = eventsJson[i];
            events.push(new Event(
                event.id,
                event.name,
                event.description,
                event.datetime,
                event.place
            ));
        }

        return events;
    } catch(error) {
        console.warn('Could get events: ' + error);
    }

    return null;
}

export async function hasUser(email) {
    try {
        let response = await fetch(settings.SERVER_API_URL + 'account/checkAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email
            })
        });

        let responseJson = await response.json();
        if(responseJson) {
            return false;
        }
    } catch (error) {
        console.warn(error);
    }

    return true;
}
