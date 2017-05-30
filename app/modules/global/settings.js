/////////// SERVER CONNECTION ////////////////

// Localhost (set your localhost IP here)
const localhostIp = '10.33.178.149';
const localhostURL = 'http://' + localhostIp + ':8080/';

// The server URL, you usually shouldn't have to change this
const remoteURL = 'http://54.229.99.105:8080/viseocompanion/api/';

// The URL you want to use (should be either localhostURL or remoteURL)
let serverURL = localhostURL;

/////////// RESTFUL API ////////////////
const restRoutes = {
    addEvent: serverURL + 'events/',
    getEvent: serverURL + 'events/',
    getEvents: serverURL + 'events',
    addUser: serverURL + 'users/',
    getUsers: serverURL + 'users',
    getUser: serverURL + 'users/',
    authenticate: serverURL + 'authenticate',
    resetPassword: serverURL + 'resetPassword',
    addEventParticipant: (eventId, userId) => {
        return serverURL + 'events/' + eventId + '/users/' + userId;
    },
    removeEventParticipant: (eventId, userId) => {
        return serverURL + 'events/' + eventId + '/users/' + userId;
    },
    getEventParticipants: eventId => {
        return serverURL + 'events/' + eventId + '/users';
    },
    getCommentsByEvent: (eventId) => {
        return serverURL + 'comments/events/' + eventId ;
    },
    likeComment:(commentId,userId)=> {
        return serverURL + 'comments/'+commentId+'/like/'+userId;
    },
    dislikeComment:(commentId,userId)=> {
        return serverURL + 'comments/'+commentId+'/dislike/'+userId;
    },
    deleteComment:(commentId)=> {
        return serverURL + 'comments/'+commentId;
    },
    updatedEvent: eventId => {
        return serverURL + 'events/' + eventId;
    },
    removeEvent: eventId => {
        return serverURL + 'events/' + eventId;
    },
    getEventParticipant: (eventId, userId) => {
        return serverURL + 'events/' + eventId + '/users/' + userId;
    },
    getEventsWithParticipant: (userId) => {
        return serverURL + 'events/users/' + userId;
    },
    getUserByEmail: email => {
        return serverURL + 'users/emails/' + email + '/';
    },
    getEventsByRegisteredUser: userId => {
        return serverURL + 'events/users/' + userId;
    },
    getEventsBefore: dateBefore => {
        return serverURL + 'events?before=' + dateBefore;
    },
    getEventAfter: dateAfter => {
        return serverURL + 'events?after=' + dateAfter;
    }
};

/////////// EXPORTED SETTINGS ////////////////
export default {
    serverURL,
    api: restRoutes,
};
