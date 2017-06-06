import React, {Component} from 'react';
import AppText from '../../global/AppText';
import {View} from 'react-native';

export default class RecoverPassword extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <AppText>Recover Password form</AppText>
            </View>
        )
    }
}