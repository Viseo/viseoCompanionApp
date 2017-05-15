import thunkMiddleware from 'redux-thunk';
import viseoCompanionApp from './../reducers';
import {compose, applyMiddleware, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const initialState = {
    events: {
        isFetching: false,
        didInvalidate: false,
        items: [],
        itemsExpired: [],
    },
    filters: [],
    searchWords: [],
    visibilityFilter: 'SHOW_ALL',
    user: {
        id: 1,
        rememberMe: true,
        email: '',
        password: '',
        authenticationStatus: 0,
    },
};

const configureStore = (preloadedState) => {
    preloadedState = {
        ...initialState,
        ...preloadedState,
    }

    const store = createStore(
        viseoCompanionApp,
        preloadedState,
        compose(
            applyMiddleware(thunkMiddleware),
            autoRehydrate()
        )
    )

    persistStore(store, {
        storage: AsyncStorage,
        whitelist: [
            'user'
        ]
    });

    return store;
};

export default configureStore;