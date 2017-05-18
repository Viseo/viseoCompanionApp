import { Navigation } from 'react-native-navigation';
import React, {Component} from 'react';
import {Text, View} from "react-native";

class FirstTabScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>FirstTabScreen</Text>
            </View>
        );
    }
}
class SecondTabScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>SecondTabScreen</Text>
            </View>
        );
    }
}
class PushedScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>PushedScreen</Text>
            </View>
        );
    }
}

export function registerScreens() {
    Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
    Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
    Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
}