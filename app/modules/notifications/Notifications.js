import React, {Component} from 'react';
import {View} from 'react-native';
import AppText from '../global/components/AppText';

export default class Notifications extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <AppText>Liste des notifications</AppText>
            </View>
        );
    }
}