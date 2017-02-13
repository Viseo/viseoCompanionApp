/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';
import Home from './scenes/home';

export default class ViseoCompanion extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Home />
        );
    }
}