import settings from './settings';
import {showUnreachableServerPopup} from './navigationUtil';

const serverTimeout = 2000;

export async function callWithTimeout(func, onServerTimeout) {
    let funcPromise = new Promise(async (resolve) => {
        await func();
        resolve();
    });
    let timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject();
        }, serverTimeout);
    });
    let race = Promise.race([funcPromise, timeoutPromise]);
    race.catch(() => {
        onServerTimeout();
    });
}

export async function doServerCall(func) {
    await callWithTimeout(
        () => func(),
        showUnreachableServerPopup,
    );
}

export async function addEvent(event, userId) {
    try {
        let imageUrl = null;
        if (event.image) {
            let formData = new FormData();
            formData.append('file', {
                uri: event.image.uri,
                type: 'image/jpg',
                name: 'image.jpg',
            });
            let responseImage = await fetch(settings.api.uploadImage, {
                method: 'POST',
                body: formData,
            });
            imageUrl = await responseImage.text();
        }
        return await fetch(settings.api.addEvent(userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': event.name,
                'description': event.description,
                'datetime': event.datetime,
                'keywords': event.keywords || '',
                'place': event.location,
                'version': '0',
                'category': event.category,
                'imageUrl': imageUrl,
            }),
        });
    } catch (error) {
        console.log('db::addEvent ' + error);
        return null;
    }
}

export async function deleteEventDb(id) {
    try {
        let response = await fetch(settings.api.removeEvent(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if (response)
            return true;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addEventParticipant(eventId, userId) {
    try {
        let response = await fetch(settings.api.addEventParticipant(eventId, userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        console.log('db::addEventParticipant ' + error);
        return null;
    }
}

export async function addUser(email, password, firstName, lastName) {
    try {
        let response = await fetch(settings.api.addUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
            }),
        });

        return await response.json();
    } catch (error) {
        console.log('db::addUser ' + error);
        return false;
    }
}

export async function updateUser(user) {
    try {
        let response = await fetch(settings.api.updateUser, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': user.id,
                'version': user.version,
                'email': user.email,
                'firstName': user.firstName,
                'lastName': user.lastName,
                'password': user.password,
                'roles': user.roles,
            }),
        });
        return await response.json();
    } catch (error) {
        console.log('db::updateUser ' + error);
        return null;
    }
}

export async function authenticate(email, password) {
    try {
        let response = await fetch(settings.api.authenticate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
            }),
        });
        let user = await response.json();
        return {
            ...user,
            password: user.password,
        };
    } catch (error) {
        console.log('db::authenticate ' + error);
        return null;
    }
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
                event.category,
            ));
        }
        return events;
    } catch (error) {
        console.log('db::getEvents ' + error);
        return [];
    }
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
                location: event.place,
            });
        }
        return events;
    } catch (error) {
        console.log('db::getEventsByRegisteredUser ' + error);
        return [];
    }
}

export async function getUserByEmail(email) {
    try {
        let response = await fetch(settings.api.getUserByEmail(email));
        return await response.json();
    } catch (error) {
        console.log('db::getUserByEmail ' + error);
        return null;
    }
}

export async function getUser(userId) {
    try {
        let response = await fetch(settings.api.getUser(userId));
        return await response.json();
    } catch (error) {
        console.log('db::getUser ' + error);
        return null;
    }
}

export async function getEventParticipant(eventId, userId) {
    try {
        let response = await fetch(settings.api.getEventParticipant(eventId, userId));
        return await response.json();
    } catch (error) {
        console.log('db::getEventParticipant ' + error);
        return null;
    }
}

export async function getEventParticipants(eventId) {
    try {
        let response = await fetch(settings.api.getEventParticipants(eventId));
        let participantsJson = await response.json();
        let participants = [];
        for (let i = 0; i < participantsJson.length; i++) {
            let participant = participantsJson[i];
            participants.push(participant.id);
        }
        return participants;
    } catch (error) {
        console.log('db::getEventParticipants ' + error);
        return null;
    }
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
                event.category,
            ));
        }
        return events;
    } catch (error) {
        console.log('db::getEventsWithParticipant ' + error);
        return null;
    }
}

export async function removeEventParticipant(eventId, userId) {
    try {
        let response = await fetch(settings.api.removeEventParticipant(eventId, userId), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let responseJson = await response.json();
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.log('db::removeEventParticipant ' + error);
        return false;
    }
}

export async function addLike(commentId, userId) {
    try {

        let response = await fetch(settings.api.likeComment(commentId, userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let responseJson = await response.json();
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function dislike(commentId, userId) {
    try {
        let response = await fetch(settings.api.dislikeComment(commentId, userId), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let responseJson = await response.json();
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function deleteCommentDb(commentId) {
    try {
        let response = await fetch(settings.api.deleteComment(commentId), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let responseJson = await response.json();
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function updateEvent(event) {
    try {
        let response = await fetch(settings.api.updatedEvent(event.id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': event.id,
                'name': event.name,
                'description': event.description,
                'datetime': event.date,
                'keywords': event.keywords || '',
                'place': event.location,
                'version': event.version,
                'category': event.category,
            }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addComment(comment) {
    try {
        await fetch(settings.api.addComment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
    } catch (error) {
        console.warn('db::addComment ' + error);
    }
    return false;
}

export async function updateComment(comment) {
    try {
        let response = await fetch(settings.api.updatedComment, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': comment.id,
                'version': comment.version,
                'content': comment.content,
                'datetime': comment.datetime,
            }),
        });
        let responseJson = await response.json();
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function addChildComment(childComment) {
    try {
        let response = await fetch(settings.api.addChildComment(childComment.commentId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(childComment),
        });
        let responseJson = await response.json();
        if (responseJson) {
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}