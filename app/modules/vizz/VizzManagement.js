import React, {Component} from 'react';
import {View} from "react-native";
import AppText from "../global/AppText";

export default class VizzManagement extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <AppText>Gestion de mes vizz</AppText>
            </View>
        );
    }
}