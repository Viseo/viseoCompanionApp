/**
 * Created by LMA3606 on 13/02/2017.
 */

// If you're running on another computer, make sure to put your own server ip address

///////////SERVER CONNECTION////////////////
// Localhost
 //let SERVER_API_URL = 'http://10.56.166.177:8080/';
 let SERVER_API_URL = 'http://10.33.178.43:8080/';

// Home
//  let SERVER_API_URL = 'http://192.168.1.8:8080/api/';

// AWS Dev server
//let SERVER_API_URL = 'http://54.229.99.105:8080/viseocompanion/api/';

let ACCOUNT_API_URL = SERVER_API_URL + '/account/';
let EVENT_API_URL = SERVER_API_URL + '/event/';

const restRoutes = {
    addEvent: SERVER_API_URL + 'events',
    getEvent: SERVER_API_URL + 'events/',
    getEvents: SERVER_API_URL + 'events',
    addUser: SERVER_API_URL + 'users',
    getUsers: SERVER_API_URL + 'users',
    getUser: SERVER_API_URL + 'users/',
    authenticate: SERVER_API_URL + 'authenticate',
    resetPassword: SERVER_API_URL + 'resetPassword',
    addEventParticipant: (eventId, userId) => {
        return SERVER_API_URL + 'events/' + eventId + '/users/' + userId;
    },
    removeEventParticipant: (eventId, userId) => {
        return SERVER_API_URL + 'events/' + eventId + '/users/' + userId;
    },
    getEventParticipants: eventId => {
        return SERVER_API_URL + 'events/' + eventId + '/users';
    },
    updatedEvent: eventId => {
        return SERVER_API_URL + 'events/' + eventId ;
    },
    removeEvent: eventId => {
        return SERVER_API_URL + 'events/' + eventId ;
    },
    getEventParticipant: (eventId, userId) => {
        return SERVER_API_URL + 'events/' + eventId + '/users/' + userId;
    },
    getEventsWithParticipant: (userId) => {
        return SERVER_API_URL + 'events/users/' + userId;
    },
    getUserByEmail: email => {
        return SERVER_API_URL + 'users/emails/' + email + '/';
    },
    getEventsByRegisteredUser: userId => {
        return SERVER_API_URL + 'events/users/' + userId;
    }
}

const settings = {
    SERVER_API_URL,
    ACCOUNT_API_URL,
    EVENT_API_URL,
    api: restRoutes
};

export default settings;
