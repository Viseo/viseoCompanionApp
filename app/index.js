/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, {Component} from 'react';
import {View, Text, Navigator} from 'react-native';
import Home from './scenes/home';
import Authentication from './scenes/authentication';

export default class ViseoCompanion extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const routes = [
            {title: 'Home'},
            {title: 'Authentication'},
        ];
        return (
            <Navigator
                initialRoute={routes[0]}
                renderScene={(route, navigator) => {
                    if(route.title === 'Home') {
                        return (
                            <Home
                                onForward={() => {
                                    navigator.push({
                                        title: 'Authentication'
                                    });
                                }}
                            />
                        );
                    } else if(route.title === 'Authentication') {
                        return (
                            <Authentication />
                        );
                    }
                }}
            />
        )
    }
}