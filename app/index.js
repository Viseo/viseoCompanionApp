/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, {Component} from "react";
import {View, Text, Navigator, BackAndroid} from "react-native";
import Home from "./scenes/home";
import Authentication from "./scenes/authentication";
import ListEvents from "./scenes/listEvents";
import Event from "./scenes/event";

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
            {title: 'Authentication'},
            {title: 'ListEvents'},
            {title: 'Event'},
        ];
        return (
            <Navigator
                initialRoute={routes[0]}
                renderScene={(route, navigator) => {
                    this.navigator = navigator;
                    if(route.title === 'Home') {
                        return (
                            <Home
                                onForward={() => {
                                    navigator.push({
                                        title: 'Authentication'
                                    });
                                }}
                                onPrint={() => {
                                    navigator.push({
                                        title: 'ListEvents'
                                    });
                                }}
                            />
                        );
                    } else if(route.title === 'Authentication') {
                        return (
                            <Authentication />
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