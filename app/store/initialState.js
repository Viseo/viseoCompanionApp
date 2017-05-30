export default {
    authentication: {
        isAuthenticated: false,
        rememberUser: true,
        loggedUser: {
            email: '',
            password: '',
        }
    },
    events: {
        isFetching: false,
        items: [],
        itemsExpired: [],
    },
    comments:{
        commentsItems:[],
        isFetching: false,
    },
    filters: [],
    searchWords: [],
    visibilityFilter: 'SHOW_ALL',
    user: {
        id: 1,
        email: '',
        password: '',
        firstName: 'non renseigné',
        lastName: 'non renseigné',
    },
};