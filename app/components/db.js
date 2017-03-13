/**
 * Created by AAB3605 on 16/02/2017.
 */
import settings from '../config/settings';
import Event from './event';
import User from './user';
import * as util from './../util';

export async function addUser(email, password) {
    if(!email || !util.isEmailValid(email))
        return false;

    if(!password || !util.isPasswordValid(password))
        return false;

    try {
        let response = await fetch(settings.api.addUser, {
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
        console.warn('db::addUser ' + error);
    }

    return false;
}

export async function checkCredentials(email, password) {
    try {
        let response = await fetch(settings.api.authenticate, {
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
        console.warn('db::checkCredentials ' + error);
        return -1;
    }

    return false;
}

export async function getEvents() {
    try {
        let response = await fetch(settings.api.getEvents);
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
        console.warn('db::getEvents ' + error);
    }

    return null;
}

export async function getEventParticipant(eventId, userId) {
    try {
        let response = await fetch(settings.api.getEventParticipant(eventId, userId));
        let user = await response.json();

        if(user) {
            return new User(user.id, user.firstName, user.lastName, user.email, user.password);
        }

    } catch (error) {
        console.warn('db::getEventParticipant ' + error);
    }

    return null;
}

export async function getEventParticipants(eventId) {
    try {
        let response = await fetch(settings.api.getEventParticipants(eventId));
        let participantsJson = await response.json();

        let participants = [];
        for (let i = 0; i < participantsJson.length; i++){
            let participant = participantsJson[i];
            participants.push(new User(
                participant.id,
                participant.firstName,
                participant.lastName,
                participant.email,
                participant.password
            ));
        }

        return participants;
    } catch (error) {
        console.warn('db::getEventParticipants ' + error);
    }

    return null;
}

export async function hasUser(email) {
    try {
        let response = await fetch(settings.api.getUserByEmail + encodeURIComponent(email));
        let responseJson = await response.json();
        if(responseJson || responseJson.email == email) {
            return true;
        }
    } catch (error) {
        console.warn('db::hasUser ' + error);
        return false;
    }

    return false;
}
