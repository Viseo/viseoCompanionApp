import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../modules/global/colors';
import AppText from '../global/components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NotificationCard extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.card}
                >
                    {this.renderEventInfo()}
                </TouchableOpacity>
            </View>
        );
    }

    renderEventInfo() {
        return (
            <View style={styles.eventInfo}>

                <View style={styles.firstRow}>
                    {this.renderTitle()}
                    {this.renderDate()}
                </View>
                <View style={styles.secondRow}>
                    {this.renderLocation()}
                    {this.renderTime()}
                </View>
                <View style={{alignItems: 'center'}}>
                    <Icon.Button
                        name="star"
                        backgroundColor="#3b5998"
                        onPress={this._showNotationPopup}>
                        Évaluer
                    </Icon.Button>

                </View>
            </View>
        );
    }

    renderTitle() {
        return (
            <View style={styles.name}>
                <AppText style={{fontSize: 20}}>{this.props.name}</AppText>
            </View>
        );
    }

    renderDate() {
        return (
            <View style={styles.date}>
                <AppText>{this.props.day}</AppText>
            </View>
        );
    }

    renderLocation() {
        return (
            <View style={styles.location}>
                <AppText>{this.props.location}</AppText>
            </View>
        );
    }

    renderTime() {
        return (
            <View style={styles.time}>
                <AppText>à {this.props.time}</AppText>
            </View>
        );
    }

    _showNotationPopup = () => {
        const date = this.props.day + ' à ' + this.props.time;
        this.props.navigator.showLightBox({
            screen: 'notation.popup',
            title: 'Multi popup',
            style: {
                backgroundBlur: 'dark',
                backgroundColor: '#135caa70',
            },
            passProps: {
                eventName: this.props.name,
                location: this.props.location,
                date: date,
                eventId: this.props.eventId,
                userId: this.props.userId,
                navigator: this.props.navigator,
            },
        });
    };
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 0.5,
        borderColor: colors.blue,
        marginTop: 10,
        borderRadius: 10,
    },
    eventInfo: {
        flex: 100,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    firstRow: {
        flex: 6,
        flexDirection: 'row',
    },
    secondRow: {
        flex: 5,
        flexDirection: 'row',
    },
    name: {
        flex: 6,
        justifyContent: 'flex-start',
    },
    date: {
        flex: 3,
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 5,
    },
    time: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    location: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});

const styleFont = StyleSheet.create({
    textFont: {
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
});

