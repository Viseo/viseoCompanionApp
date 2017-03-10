/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, {Component} from 'react';
import {View, Text, Navigator, BackAndroid} from 'react-native';
import TestScene from './scenes/testScene';
import SignIn from './scenes/signIn';
import SignUp from './scenes/signUp';
import RecoverPassword from './scenes/recoverPassword';
import Home from "./scenes/home";
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
            {title: 'SignIn'},
            {title: 'SignUp'},
            {title: 'RecoverPassword'},
            {title: 'TestScene'},
            {title: 'Event'},
        ];
        return (
            <Navigator
                initialRoute={routes[0]}
                renderScene={(route, navigator) => {
                    this.navigator = navigator;
                    if(route.title === 'TestScene') {
                        return (
                            <TestScene
                                onForward={() => {
                                    navigator.push({
                                        title: 'SignIn'
                                    });
                                }}
                                onPrint={() => {
                                    navigator.push({
                                        title: 'Home'
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
                    }
                }}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.PushFromRight
                }
            />
        )
    }
}