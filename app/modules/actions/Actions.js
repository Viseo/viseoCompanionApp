import React, {Component} from 'react';
import {View} from 'react-native';
import ActionCard from './ActionCard';

export default class Actions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ActionCard/>
            </View>
        );
    }
}