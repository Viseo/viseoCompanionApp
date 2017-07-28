import React, {Component} from 'react';
import {Image, View} from 'react-native';
import AppText from '../global/components/AppText';

export default class ActionCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row', height: 100}}>
                <Image style={{height: 100, width: 100}}
                       source={require('../../images/happy.png')}
                />
                <View style={{flexDirection: 'column'}}>
                    <AppText>date</AppText>
                    <AppText>action</AppText>
                </View>
            </View>
        );
    }

}