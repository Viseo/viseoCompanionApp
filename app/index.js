/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, {Component} from "react";
import {View, Text, Navigator, BackAndroid} from "react-native";
import SignIn from "./scenes/signIn";
import SignUp from "./scenes/signUp";
import RecoverPassword from "./scenes/recoverPassword";
import Home from "./scenes/home";
import strings from "./util/localizedStrings";
import setDateLang from "./util/dateHandler";
import AddEvent from './scenes/addEvent';
import Profile from './scenes/profile';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import viseoCompanionApp from './reducers';
import {fetchEvents} from './actionCreators/events'
import Event from './scenes/Event'

const initialState = {
    events: {
        isFetching: false,
        didInvalidate: false,
        items: [],
    },
    filters: [],
    searchWords: [],
    visibilityFilter: 'SHOW_ALL',
    user: {
        id: 1
    }
}
let store = createStore(
    viseoCompanionApp,
    initialState,
    applyMiddleware(thunkMiddleware)
);
store.dispatch(fetchEvents(store.getState().user))

export default class ViseoCompanion extends Component {
    constructor(props) {
        super(props);

        this.navigator;
        this.state = {};
    }

    /**
     * When the back button is pressed, navigate back to the previous scene.
     */
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
        ];
        return (
            <Provider store={store}>
                <Navigator
                    initialRoute={routes[1]}
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
                            <Profile navigator={navigator} {...route.passProps}/>
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