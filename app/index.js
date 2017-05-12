/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, {Component} from "react";
import {Navigator, BackAndroid} from "react-native";
import SignIn from "./containers/SignInForm";
import SignUp from "./scenes/signUp";
import RecoverPassword from "./scenes/recoverPassword";
import Home from "./scenes/home";
import History from "./scenes/History";
import strings from "./util/localizedStrings";
import setDateLang from "./util/dateHandler";
import AddEvent from './scenes/addEvent';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import viseoCompanionApp from './reducers';
import {fetchEvents, fetchEventsExp} from './actionCreators/events'
import Event from './scenes/Event'
import UserProfile from "./scenes/UserProfile";
import {compose, applyMiddleware, createStore} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

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
        // resetPasswordStatus: 0,0updateStatus: 0,
    }
};

let store = createStore(
    viseoCompanionApp,
    initialState,
    compose(
        applyMiddleware(thunkMiddleware),
        autoRehydrate()
    )
);

persistStore(store, {
    storage: AsyncStorage,
    whitelist: [
        'user'
    ]
});


export default class ViseoCompanion extends Component {
    constructor(props) {
        super(props);

        this.navigator;
        this.state = {};
    }

    componentWillMount() {
        strings.setLanguage('fr');
        setDateLang(strings.getLanguage());

        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
                this.navigator.pop();
                return true;
            }
            return false;
        });
    }

    render() {
        const routes = [
            {title: 'Home'},
            {title: 'SignIn'},
            {title: 'SignUp'},
            {title: 'RecoverPassword'},
            {title: 'Event'},
            {title: 'AddEvent'},
            {title: 'Profile'},
            {title: 'History'},
        ];
        return (
            <Provider store={store}>
                <Navigator
                    initialRoute={routes[0]}
                    renderScene={(route, navigator) => {
                    this.navigator = navigator;
                    if(route.title === 'SignIn') {
                        return (
                            <SignIn navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'SignUp') {
                        return (
                            <SignUp navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'RecoverPassword') {
                        return (
                            <RecoverPassword navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'Home') {
                        // store.dispatch(fetchEvents(store.getState().user));
                        return (
                            <Home navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'Event') {
                        return (
                            <Event navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'AddEvent') {
                        return (
                            <Event navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'Profile') {
                        return (
                            <UserProfile navigator={navigator} {...route.passProps}/>
                        );
                    }
                    else if(route.title === 'History') {
                        // store.dispatch(fetchEventsExp(store.getState().user));
                        return (
                            <History navigator={navigator} {...route.passProps}/>
                        );
                    }
                }}
                    configureScene={(route, routeStack) =>
                        Navigator.SceneConfigs.PushFromRight
                    }
                />
            </Provider>
        )
    }
}