export default {
    authentication: {
        isAuthenticated: false,
        rememberUser: true,
        loggedUser: {
            email: '',
            password: '',
        }
    },
    comments:{
        commentsItems:[],
        isFetching: false,
    },
    events: {
        isFetching: false,
        items: [],
        itemsExpired: [],
    },
    filters: [],
    live: {
        chatMessages: [],
    },
    searchWords: [],
    user: {
        id: 1,
        email: '',
        password: '',
        firstName: 'non renseigné',
        lastName: 'non renseigné',
        version: 1,
    },
    visibilityFilter: 'SHOW_ALL',
};