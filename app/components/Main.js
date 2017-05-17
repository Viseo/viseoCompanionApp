import React, {Component} from "react";
import {Text, TouchableHighlight, View} from "react-native";
import App from "../containers/App";

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 10}}>
                <TouchableHighlight
                    onPress={() => {
                        this._navigate('Hello', 'Modal')
                    }}
                >
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }

    _navigate(name, type = 'Normal') {
        this.props.navigator.push({
            component: App,
            passProps: {
                name,
            },
            type,
        });
    }
}