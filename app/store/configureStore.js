import thunkMiddleware from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import {autoRehydrate, persistStore} from "redux-persist";
import {AsyncStorage} from "react-native";
import initialState from './initialState';
import rootReducer from "./rootReducer";

const configureStore = (preloadedState) => {
    preloadedState = {
        ...initialState,
        ...preloadedState,
    };

    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunkMiddleware),
            autoRehydrate()
        )
    );

    persistStore(store, {
        storage: AsyncStorage,
        whitelist: [
            'authentication'
        ]
    });

    return store;
};

export default configureStore;