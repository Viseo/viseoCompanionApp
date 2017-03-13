/**
 * Created by AAB3605 on 10/03/2017.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Picker, StyleSheet, AppState} from 'react-native';
import CheckBox from 'react-native-check-box';

export default class EventCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participating: props.participating || false
        }
    }

    getBriefIfTextIsTooLong(text, maxLength) {
        if (text.length > maxLength) {
            text = text.substr(0, maxLength) + '...';
        }
        return text;
    }

    render() {
        let participationIndicator = this.state.participating ? this.renderParticipationIndicator() : null;
        return (
            <View style={{height:90}}>
                <TouchableOpacity style={styles.card}>
                    {participationIndicator}
                    {this.renderEventInfo()}
                </TouchableOpacity>
            </View>
        );
    }

    renderParticipationIndicator() {
        return (
            <View style={styles.dotContainer}>
                <View style={styles.dot}/>
            </View>
        );
    }

    renderEventInfo() {
        return (
            <View style={styles.eventInfo}>
                <View style={styles.firstRow}>
                    {this.renderTitle()}
                    {this.renderDateAndLocation()}
                </View>
                <View style={styles.secondRow}>
                    {this.renderDescription()}
                </View>
            </View>
        );
    }

    renderTitle() {
        return (
            <Text className="info name" style={styles.eventName}>
                {this.getBriefIfTextIsTooLong(this.props.data.name, 32) }
            </Text>
        );
    }

    renderDescription() {
        return (
            <Text className="info description" style={styles.eventDescription}>
                {this.getBriefIfTextIsTooLong(this.props.data.description, 120)}
            </Text>
        );
    }

    renderDateAndLocation() {
        return (
            <Text style={styles.eventLocation}>
                {this.props.data.getTime()} at {this.props.data.location.toUpperCase()}
            </Text>
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

const styles = StyleSheet.create({
    dotContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 10,
        marginLeft: 2,
        marginRight: 5,
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#6492ef',
        borderRadius: 50,
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    secondRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    eventName: {
        flex: 2,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 17,
        color: 'black'
    },
    eventDescription: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
    },
    eventLocation: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'right',
        fontSize: 13
    },
    eventInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 5
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        height: 90,
        borderBottomWidth: 0.5,
        borderBottomColor: '#999999'
    }
});