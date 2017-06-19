import {conf, localhostIp} from './localConf';

/////////// SERVER CONNECTION ////////////////

//To change your LocalIp, edit the 'localConf.js' file.
const localhostURL = 'http://' + localhostIp + ':8080/';

// The server URL, you usually shouldn't have to change this
const remoteURL = 'http://companion-dev.viseolab.com/';

let serverURL = conf === 'DEV' ? localhostURL : remoteURL;

/////////// RESTFUL API ////////////////
const restRoutes = {
    addUser: serverURL + 'users/',
    addComment: serverURL + 'comments',
    getEvent: serverURL + 'events/',
    getEvents: serverURL + 'events',
    updateUser: serverURL + 'users/',
    updatedEvent: serverURL + 'events/',
    updatedComment: serverURL + 'comments',
    uploadImage: serverURL + 'upload',
    authenticate: serverURL + 'authenticate',
    liveEvent: conf === 'PROD' ?
        serverURL + 'liveEvent' :
        'ws://' + localhostIp + ':8080/liveEvent',
    addEvent: (userId) => {
        return serverURL + 'events?host=' + userId;
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
    likeComment: (commentId, userId) => {
        return serverURL + 'comments/' + commentId + '/like/' + userId;
    },
    getPublishedCommentsByEvent: (eventId) => {
        return serverURL + 'comments/events/' + eventId + '?filter=published';
    },
    getEventParticipants: eventId => {
        return serverURL + 'events/' + eventId + '/users';
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
    },
    dislikeComment: (commentId, userId) => {
        return serverURL + 'comments/' + commentId + '/like/' + userId;
    },
    deleteComment: (commentId) => {
        return serverURL + 'comments/' + commentId;
    },
    removeEvent: eventId => {
        return serverURL + 'events/' + eventId;
    },
};

/////////// EXPORTED SETTINGS ////////////////
export default {
    serverURL,
    api: restRoutes,
};
