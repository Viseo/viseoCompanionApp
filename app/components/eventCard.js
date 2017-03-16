/**
 * Created by AAB3605 on 10/03/2017.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Picker, StyleSheet, AppState} from 'react-native';
import CheckBox from 'react-native-check-box';
import Swipeout from 'react-native-swipe-out';
import strings from './../util/localizedStrings';

export default class EventCard extends Component {

    static defaultProps = {
        title: '',
        description: '',
        location: '',
        date: '',
        onParticipationChange: () => {
        }
    }

    constructor(props) {
        super(props);
    }

    getBriefIfTextIsTooLong(text, maxLength) {
        if (text.length > maxLength) {
            text = text.substr(0, maxLength) + '...';
        }
        return text;
    }

    getSwipeOption = () => {
        return this.props.participating ?
            [{
                className:'participate',
                text: strings.IAmNotGoingToEvent,
                onPress: () => {
                    this.props.onParticipationChange()
                },
                backgroundColor: '#ba7a7c',
                color: '#601d20',
            }] :
            [{
                className:'participate',
                text: strings.IAmGoingToEvent,
                onPress: () => {
                    this.props.onParticipationChange()
                },
                backgroundColor: '#4fba8a',
                color: '#14605a',
            }];
    }

    render() {
        let swipeOption = this.getSwipeOption();
        return (
            <View>
                <Swipeout
                    className="swipeout"
                    style={{ backgroundColor: '#c1c1c1' }}
                    right={swipeOption}
                    autoClose={true}
                >
                    <TouchableOpacity
                        style={styles.card}
                        onPress={this.props.onPress}
                    >
                        {this.renderParticipationIndicator()}
                        {this.renderTypeIndicator()}
                        {this.renderEventInfo()}
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

    renderTypeIndicator() {
        return (
            <View style={styles.eventType}/>
        );
    }

    renderParticipationIndicator() {
        return (
            <View style={styles.dotContainer}>
                <View style={[
                    styles.dot,
                    {backgroundColor:(this.props.participating) ? '#6492ef' : 'white'}
                ]}/>
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
                {this.getBriefIfTextIsTooLong(this.props.title, 28) }
            </Text>
        );
    }

    renderDescription() {
        return (
            <Text className="info description" style={styles.eventDescription}>
                {this.getBriefIfTextIsTooLong(this.props.description, 120)}
            </Text>
        );
    }

    renderDateAndLocation() {
        //todo find a solution to correctly prompt the Date&location in several div
        return (
            <View style={styles.eventLocation}>
                <Text style={styles.eventLocationText}>
                    {this.props.date}
                    {" "+ strings.at + " "}
                    {this.getBriefIfTextIsTooLong(this.props.location.toUpperCase(),35)}
                </Text>
                {/*<Text className="info date" style={styles.eventLocationText}>*/}
                    {/*{this.props.date}*/}
                {/*</Text>*/}
                {/*<Text style={styles.eventLocationText}>*/}
                    {/*{" "+ strings.at + " "}*/}
                {/*</Text>*/}
                {/*<Text className="info location" style={styles.eventLocationText}>*/}
                    {/*{this.getBriefIfTextIsTooLong(this.props.location.toUpperCase(),30)}*/}
                {/*</Text>*/}
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

const styles = StyleSheet.create({
    dotContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 10,
        marginLeft: 3,
        marginRight: 3,
    },
    dot: {
        width: 10,
        height: 10,
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
        justifyContent: 'flex-end',
        flexDirection:'row'
    },
    eventLocationText: {
        textAlign: 'right',
        fontSize: 13,
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
    },
    eventType: {
        width: 2,
        height: 90,
        backgroundColor: '#ef4f42',
        marginLeft: 2,
    }
});