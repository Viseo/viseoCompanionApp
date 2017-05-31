// If you're running on another computer, make sure to put your own server ip address

///////////SERVER CONNECTION////////////////
// Localhost
    //let SERVER_API_URL = 'http://10.56.166.177:8080/';
let SERVER_API_URL = 'http://10.33.179.5:8080/';

// Home
//  let SERVER_API_URL = 'http://192.168.1.8:8080/api/';

// AWS Dev server
//let SERVER_API_URL = 'http://54.229.99.105:8080/viseocompanion/api/';

let ACCOUNT_API_URL = SERVER_API_URL + '/account/';
let EVENT_API_URL = SERVER_API_URL + '/event/';

const restRoutes = {
    addEvent: SERVER_API_URL + 'events',
    updatedEvent: SERVER_API_URL + 'events',
    getEvent: SERVER_API_URL + 'events/',
    getEvents: SERVER_API_URL + 'events',
    addUser: SERVER_API_URL + 'users',
    getUsers: SERVER_API_URL + 'users',
    getUser: SERVER_API_URL + 'users/',
    authenticate: SERVER_API_URL + 'authenticate',
    resetPassword: SERVER_API_URL + 'resetPassword',
    addComment: SERVER_API_URL + 'comments',
    addChildComment: SERVER_API_URL + 'comments/2',
    /*addChildComment: (commentId) => {
        return SERVER_API_URL + 'comments/' + commentId ;
    },*/
    getCommentsByEvent: (eventId) => {
        return SERVER_API_URL + 'comments/events/' + eventId ;
    },
    addEventParticipant: (eventId, userId) => {
        return SERVER_API_URL + 'events/' + eventId + '/users/' + userId;
    },
    removeEventParticipant: (eventId, userId) => {
        return SERVER_API_URL + 'events/' + eventId + '/users/' + userId;
    },
    getEventParticipants: eventId => {
        return SERVER_API_URL + 'events/' + eventId + '/users';
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
    },
    addCommentParticipant: (eventId,userId) => {
        return SERVER_API_URL + 'comment/' + eventId + '/users/' + userId;
    }
};

const settings = {
    SERVER_API_URL,
    ACCOUNT_API_URL,
    EVENT_API_URL,
    api: restRoutes,
    minSplashScreenDuration: 1000,
    maxSplashScreenDuration: 2500,
};

export default settings;
