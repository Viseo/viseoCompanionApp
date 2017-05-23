import React, {Component} from 'react';
import {View} from "react-native";
import AppText from "../global/AppText";

export default class Shop extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <AppText>Catalague disponible pour acheter avec les vizz.</AppText>
            </View>
        );
    }

}