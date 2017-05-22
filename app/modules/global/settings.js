/////////// SERVER CONNECTION ////////////////

// Localhost (set your localhost IP here)
const localhostIp = '192.168.1.62';
const localhostURL = 'http://' + localhostIp + ':8080/';

// The server URL, you usually shouldn't have to change this
const remoteURL = 'http://54.229.99.105:8080/viseocompanion/api/';

// The URL you want to use (should be either localhostURL or remoteURL)
let SERVER_API_URL = localhostURL;

let ACCOUNT_API_URL = SERVER_API_URL + '/account/';
let EVENT_API_URL = SERVER_API_URL + '/event/';


/////////// RESTFUL API ////////////////
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
        return SERVER_API_URL + 'events/' + eventId;
    },
    removeEvent: eventId => {
        return SERVER_API_URL + 'events/' + eventId;
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
    },
    getEventsBefore: dateBefore => {
        return SERVER_API_URL + 'events?before=' + dateBefore;
    },
    getEventAfter: dateAfter => {
        return SERVER_API_URL + 'events?after=' + dateAfter;
    }
};


/////////// EXPORTED SETTINGS ////////////////
const settings = {
    SERVER_API_URL,
    ACCOUNT_API_URL,
    EVENT_API_URL,
    api: restRoutes,
    minSplashScreenDuration: 1000,
};

export default settings;
