/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, {Component} from "react";
import {View, Text, Navigator, BackAndroid} from "react-native";
import SignIn from "./scenes/signIn";
import SignUp from "./scenes/signUp";
import RecoverPassword from "./scenes/recoverPassword";
import Home from "./scenes/home";
import EventDetails from "./components/events/eventDetails";
import EventCardTestScene from "./scenes/test/eventCardTestScene";
import EventsWithParticipantsTestScene from "./scenes/test/eventsWithParticipantsTestScene";
import strings from "./util/localizedStrings";
import setDateLang from "./util/dateHandler";
import db from "./util/db";
import AddEvent from './scenes/addEvent';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import viseoCompanionApp from './reducers';


const initialState = {
    events: [],
    visibilityFilter: 'SHOW_ALL',
    filters: [],
}
let store = createStore(viseoCompanionApp, initialState);

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
            {title: 'EventDetails'},
            {title: 'EventCardTestScene'},
            {title: 'EventsWithParticipantsTestScene'},
            {title: 'AddEvent'},
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
                        return (
                            <Home navigator={navigator} {...route.passProps} db={db} store={store}/>
                        );
                    } else if(route.title === 'EventDetails') {
                        return (
                            <EventDetails navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'EventCardTestScene') {
                        return (
                            <EventCardTestScene navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'EventsWithParticipantsTestScene') {
                        return (
                            <EventsWithParticipantsTestScene navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'AddEvent') {
                        return (
                            <AddEvent navigator={navigator} {...route.passProps} db={db}/>
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