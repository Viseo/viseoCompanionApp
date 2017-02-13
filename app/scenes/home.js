/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class Home extends Component {

    render() {
        return (
            <View>
                <Text>Welcome to the {this.props.title} page</Text>

                <TouchableHighlight onPress={this.props.onForward}>
                    <Text>Please click here to login</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.props.onBack}>
                    <Text>Tap me to go back</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.props.onPrint}>
                    <Text>Tap me to print the event list</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default Home;