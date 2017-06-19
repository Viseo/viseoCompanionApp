import {localhostIp, conf} from './localConf';

/////////// SERVER CONNECTION ////////////////

//To change your LocalIp, edit the 'localConf.js' file.
const localhostURL = 'http://' + localhostIp + ':8080/';

// The server URL, you usually shouldn't have to change this
const remoteURL = 'http://companion-dev.viseolab.com/';

let serverURL = conf === 'DEV' ? localhostURL : remoteURL;

/////////// RESTFUL API ////////////////
const restRoutes = {
    getEvent: serverURL + 'events/',
    getEvents: serverURL + 'events',
    addUser: serverURL + 'users/',
    updateUser: serverURL + 'users/',
    authenticate: serverURL + 'authenticate',
    updatedComment: serverURL + 'comments',
    addComment: serverURL + 'comments',
    liveEvent: conf === 'PROD' ?
        serverURL + 'liveEvent':
        'ws://' + localhostIp + ':8080/liveEvent',
    uploadImage: serverURL + 'upload',
    addEvent: (userId) => {
        return serverURL + 'events?host=' + userId;
    },
    getPublishedCommentsByEvent: (eventId) => {
        return serverURL + 'comments/events/' + eventId + '?filter=published';
    },
    addChildComment: (commentId) => {
        return serverURL + 'comments/' + commentId;
    },
    addEventParticipant: (eventId, userId) => {
        return serverURL + 'events/' + eventId + '/users/' + userId;
    },
    removeEventParticipant: (eventId, userId) => {
        return serverURL + 'events/' + eventId + '/users/' + userId;
    },
    getEventParticipants: eventId => {
        return serverURL + 'events/' + eventId + '/users';
    },
    likeComment: (commentId, userId) => {
        return serverURL + 'comments/' + commentId + '/like/' + userId;
    },
    dislikeComment: (commentId, userId) => {
        return serverURL + 'comments/' + commentId + '/like/' + userId;
    },
    deleteComment: (commentId) => {
        return serverURL + 'comments/' + commentId;
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
    getUser: userId => {
        return serverURL + 'users/' + userId;
    },
    getEventsByRegisteredUser: userId => {
        return serverURL + 'events/users/' + userId;
    },
    getEventsBefore: dateBefore => {
        return serverURL + 'events?before=' + dateBefore;
    },
    getEventAfter: dateAfter => {
        return serverURL + 'events?after=' + dateAfter;
    },
    resetPassword: email => {
        return serverURL + 'resetPassword?email=' + email;
    }
};

/////////// EXPORTED SETTINGS ////////////////
export default {
    serverURL,
    api: restRoutes,
};
