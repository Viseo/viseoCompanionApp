/**
 * Created by AAB3605 on 16/02/2017.
 */
import settings from "../config/settings";

export async function addEvent(event) {
    try {
        //TODO: make a function to add the host as a param
        let response = await fetch(settings.api.addEvent + "?host=" + event.host.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": event.name,
                "description": event.description,
                "datetime": event.date,
                "keywords": event.keywords || '',
                "place": event.location,
                "version": "0",
                "category": event.category,
                "hostId": event.host.id
            })
        })
        if (response)
            return true;
    } catch (error) {
        console.warn(error);
    }
}

export async function deleteEventDb(id) {
    try {
        let response = await fetch(settings.api.removeEvent(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        })
        if (response)
            return true;
    } catch (error) {
        console.warn(error);
    }
}

export async function addEventParticipant(eventId, userId) {
    try {
        let response = await fetch(settings.api.addEventParticipant(eventId, userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let responseJson = await response.json();
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.warn('db::addEventParticipant ' + error);
    }
    return false;
}

export async function addUser(email, password) {
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
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.warn('db::addUser ' + error);
    }

    return false;
}

export async function authenticate(email, password) {
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
        if (response.headers.get("content-length") != 0) {
            let user = await response.json();
            if (user) {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password
                };
            }
        }
    } catch (error) {
        console.warn('db::authenticate ' + error);
        return -1;
    }

    return null;
}

//TODO: clean the useless methods

export async function getEvents() {
    try {
        let response = await fetch(settings.api.getEvents);
        let eventsJson = await response.json();
        let events = [];
        for (let i = 0; i < eventsJson.length; i++) {
            let event = eventsJson[i];
            events.push(new Event(
                event.id,
                event.name,
                event.description,
                event.datetime,
                event.place,
                event.category
            ));
        }
        return events;
    } catch (error) {
        console.warn('db::getEvents ' + error);
    }
    return [];
}

export async function getEventsByRegisteredUser(userId) {
    try {
        let response = await fetch(settings.api.getEventsByRegisteredUser(userId));
        let eventsJson = await response.json();
        let events = [];
        for (let i = 0; i < eventsJson.length; i++) {
            let event = eventsJson[i];
            events.push({
                id: event.id,
                name: event.name,
                description: event.description,
                date: event.datetime,
                location: event.place
            });
        }
        return events;
    } catch (error) {
        console.warn('db::getEventsByRegisteredUser ' + error);
    }
    return [];
}

export async function getUserByEmail(email) {
    try {
        let response = await fetch(settings.api.getUserByEmail(email));
        if (response.headers.get("content-length") == null) {
            let user = await response.json();
            if (user) {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password
                };
            }
        }
    } catch (error) {
        console.warn('db::getUserByEmail ' + error);
    }
    return null;
}

export async function getEventParticipant(eventId, userId) {
    try {
        let response = await fetch(settings.api.getEventParticipant(eventId, userId));
        if (response.headers.get("content-length") != 0) {
            let user = await response.json();
            if (user) {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password
                };
            }
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
        for (let i = 0; i < participantsJson.length; i++) {
            let participant = participantsJson[i];
            participants.push(participant.id)
        }
        return participants;
    } catch
        (error) {
        console.warn('db::getEventParticipants ' + error);
    }
    return null;
}

export async function getEventsWithParticipant(userId) {
    try {
        let response = await fetch(settings.api.getEventsWithParticipant(userId));
        let eventsJson = await response.json();
        let events = [];
        for (let i = 0; i < eventsJson.length; i++) {
            let event = eventsJson[i];
            events.push(new Event(
                event.id,
                event.name,
                event.description,
                event.datetime,
                event.place,
                event.category
            ));
        }
        return events;
    } catch (error) {
        console.warn('db::getEventsWithParticipant ' + error);
    }
    return null;
}

export async function removeEventParticipant(eventId, userId) {
    try {
        let response = await fetch(settings.api.removeEventParticipant(eventId, userId), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let responseJson = await response.json();
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.warn('db::removeEventParticipant ' + error);
    }
    return false;
}


export async function updateEvent(event) {
    try {

        let response = await fetch(settings.api.updatedEvent(event.id), {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": event.id,
                "name": event.name,
                "description": event.description,
                "datetime": event.date,
                "keywords": event.keywords || '',
                "place": event.location,
                "version": event.version,
                "category": event.category
            })
        })
        if (response)
            return true;
    } catch (error) {
        console.warn(error);
    }
}



