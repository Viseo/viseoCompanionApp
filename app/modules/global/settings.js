import {localhostIp} from './localConf';

/////////// SERVER CONNECTION ////////////////

// Localhost (set your localhost IP here)
// The URL you want to use (should be either localhostURL or remoteURL)
const localhostURL = 'http://' + localhostIp + ':8080/';

// The server URL, you usually shouldn't have to change this
const remoteIp = '54.229.99.105';
const remoteURL = 'http://' + remoteIp + ':8080/viseocompanion/api/';

let serverURL = localhostURL;
let serverIp = localhostIp;

/////////// RESTFUL API ////////////////
const restRoutes = {
    getEvent: serverURL + 'events/',
    getEvents: serverURL + 'events',
    addUser: serverURL + 'users/',
    updateUser: serverURL + 'users/',
    getUsers: serverURL + 'users',
    getUser: serverURL + 'users/',
    authenticate: serverURL + 'authenticate',
    resetPassword: serverURL + 'resetPassword',
    updatedComment: serverURL + 'comments',
    addComment: serverURL + 'comments',
    liveEvent: 'ws://' + serverIp + ':8080/liveEvent',
    uploadImage: serverURL + 'upload',
    addEvent: (userId) => {
        return serverURL + 'events?host=' + userId;
    },
    getAllCommentsByEvent: (eventId) => {
        return serverURL + 'comments/events/' + eventId + '?filter=all';
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
    getEventsByRegisteredUser: userId => {
        return serverURL + 'events/users/' + userId;
    },
    getEventsBefore: dateBefore => {
        return serverURL + 'events?before=' + dateBefore;
    },
    getEventAfter: dateAfter => {
        return serverURL + 'events?after=' + dateAfter;
    },
};

/////////// EXPORTED SETTINGS ////////////////
export default {
    serverURL,
    api: restRoutes,
};
