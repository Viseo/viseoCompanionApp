/**
 * Created by AAB3605 on 17/02/2017.
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppText from '../components/appText';

class RecoverPassword extends Component {

    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                <AppText>Recover password form</AppText>
            </View>
        )
    }
}

export default RecoverPassword;