/**
 * Created by AAB3605 on 27/02/2017.
 */
import React, { Component } from "react";

import {
    View,
    Text
} from 'react-native';

export default class TestComponent extends Component {
    constructor(props) {
        super(props);
    }

    _click() {
        alert();
    }

    render() {
        return (
            <View onPress={this._click.bind(this)}>
                {this.props.items.map((item, index) => (
                    <View key={index}>
                        <Text>{item.name}</Text>
                    </View>
                ))}
            </View>
        );
    }
}