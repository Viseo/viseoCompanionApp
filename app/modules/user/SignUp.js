import React, {Component} from 'react';
import AppText from '../global/AppText';
import {View} from 'react-native';

export default class SignUp extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <AppText>Sign up form</AppText>
            </View>
        )
    }
}