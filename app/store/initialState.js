export default {
    authentication: {
        isAuthenticating: false,
        isAuthenticated: false,
        rememberUser: true,
        loggedUser: {
            email: '',
            password: '',
        },
    },
    comments: {
        items: [],
        isFetching: false,
    },
    events: {
        isFetching: false,
        items: [],
        itemsExpired: [],
        itemsReviewed: [],
        selectedItem: null,
        showCurrentDaySection: false,
    },
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
        isFetching: false,
        otherProfile: '',
        solde: 0,
    },
    review: {
        isReviewPopupDismissed: false,
    },
    actions: {
        items: [],
    },
};