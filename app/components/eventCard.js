/**
 * Created by AAB3605 on 10/03/2017.
 */
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Picker, StyleSheet, AppState} from 'react-native';
import CheckBox from 'react-native-check-box';

export default class EventCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                        borderWidth:1,
                        borderColor: 'black',
                        marginBottom:10
                    }}
            >
                {this.renderTitle()}
                {this.renderDescription()}
                {this.renderParticipateCheckBox()}
            </View>
        );
    }

    renderTitle() {
        return (
            <View>
                <Text>Titre:</Text>
                <Text className="info name">{this.props.data.name}</Text>
            </View>
        );
    }

    renderDescription() {
        return (
            <View>
                <Text>Description:</Text>
                <Text className="info description">{this.props.data.description}</Text>
            </View>
        );
    }

    renderParticipateCheckBox() {
        return (
            <View>
                <CheckBox className="participate"
                    onClick={this.props.toggleParticipation}
                    isChecked={false}
                    rightText={"Going"}
                />
            </View>
        );
    }
}