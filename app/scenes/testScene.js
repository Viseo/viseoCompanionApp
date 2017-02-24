/**
 * Created by AAB3605 on 13/02/2017.
 */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Picker, StyleSheet, AppState } from 'react-native';
import PushController from '../components/pushController';
import PushNotification from 'react-native-push-notification';

export default class TestScene extends Component {
    constructor(props){
        super(props);

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            seconds:5,
        };
    }

    componentDidMount(){
        AppState.addEventListener('change', this.handleAppStateChange);

    }
    componentWillUnmount(){
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState){
        if(appState === 'background'){
            PushNotification.localNotificationSchedule({
                message: "New event !",
                date: new Date(Date.now() + (this.state.seconds * 1000)),
            });
            console.log('app is in back', this.state.seconds);
        }
    }
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

                <Text>Choose the notification timer</Text>
                <Picker
                    style ={styles.picker}
                    selectedValue={this.state.seconds}
                    onValueChange={(seconds) => this.setState({ seconds})}
                >
                    <Picker.Item label="5" value={5}/>
                    <Picker.Item label="10" value={10}/>
                    <Picker.Item label="15" value={15}/>
                </Picker>
                <PushController/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    picker: {
        width: 100,
    }
});