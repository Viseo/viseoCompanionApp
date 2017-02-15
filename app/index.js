/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, {Component} from 'react';
import {View, Text, Navigator, BackAndroid} from 'react-native';
import Home from './scenes/home';
import SignIn from './scenes/signIn';
import SignUp from './scenes/signUp';
import ListEvents from "./scenes/listEvents";
//import Event from "./scenes/event";

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
            {title: 'ListEvents'},
            {title: 'Event'},
        ];
        return (
            <Navigator
                initialRoute={routes[2]}
                renderScene={(route, navigator) => {
                    this.navigator = navigator;
                    if(route.title === 'Home') {
                        return (
                            <Home
                                onForward={() => {
                                    navigator.push({
                                        title: 'SignIn'
                                    });
                                }}
                                onPrint={() => {
                                    navigator.push({
                                        title: 'ListEvents'
                                    });
                                }}
                            />
                        );
                    } else if(route.title === 'SignIn') {
                        return (
                            <SignIn navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'SignUp') {
                        return (
                            <SignUp navigator={navigator} {...route.passProps}/>
                        );
                    } else if(route.title === 'ListEvents') {
                        return (
                            <ListEvents
                                onForward = {(event, email) => {
                                    navigator.push({
                                        title :'Event',
                                        passProps: {
                                            event,
                                            email,
                                        },
                                    });
                                }}
                            />
                        );
                    } else if(route.title === 'Event') {
                        return (
                            <Event
                                event={this.props.event}
                                email={this.props.email}
                            />
                        );
                    }
                }}
            />
        )
    }
}