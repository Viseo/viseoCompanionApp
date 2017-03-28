/**
 * Created by VBO3596 on 22/03/2017.
 */
import React, {Component} from "react";
import {View, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import AppText from "../appText";
import strings from "../../util/localizedStrings";
import * as util from "../../util/util";

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

class EventDetailsParticipationInfos extends Component {

    static defaultProps = {
        numberOfParticipants: '121',
        notGoingColor: 'grey',
        goingColor: 'royalblue'
    }

    constructor(props) {
        super(props);
        this.state = {
            going: this.props.event.participating
        };
    }

    pressGoing = () =>{
        this.setState({going: !this.state.going});
        this.props.onPressGoing();
    }

    render() {
        return (
            <View style={styles.rectangle}>
                    {this.renderParticipants()}
                    {this.renderDate(this.props.event.date)}
                    {this.renderGoing()}
            </View>
        )
    }

    renderParticipants() {
        return (
            <View style={styles.infoItem}>
                <AppText style={styles.main}>
                    {this.props.numberOfParticipants}
                </AppText>
                <AppText style={styles.secondary}>
                    {strings.participantsLabel}
                </AppText>
            </View>
        );
    }

    renderDate(date) {
        return (
            <View style={styles.infoItem}>
                <AppText style={styles.main}>
                    {util.getFormattedHour(date)}
                </AppText>
                <AppText style={styles.secondary}>
                    {this.formatDate(date)}
                </AppText>
            </View>
        );
    }

    formatDate(date) {
        return util.isDateInThisWeekNextDays(date) ? util.getDayName(date) : util.getFormattedDate(date);
    }

    renderGoing() {
        let { going } = this.state;
        let text = going? strings.IAmNotGoingToEvent : strings.IAmGoingToEvent;
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    style={[styles.circle,
                            going && {backgroundColor: this.props.goingColor},
                            !going && {backgroundColor: this.props.notGoingColor}]}
                    onPress={this.pressGoing}/>
                <AppText>{text}</AppText>
            </View>
        );
    }
}

export default EventDetailsParticipationInfos;

const styles = StyleSheet.create({
    rectangle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: deviceHeight * 0.1,
        width: deviceWidth * 0.85,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        paddingLeft: deviceWidth * 0.05,
        paddingRight: deviceWidth * 0.05,
    },

    infoItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    main: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    },

    secondary: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16
    },

    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        margin: 2,
    }
});