/**
 * Created by VBO3596 on 22/03/2017.
 */
import React, {Component} from "react";
import {View, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import AppText from "../appText";
import strings from "../../util/localizedStrings";
import CheckBox from "react-native-check-box";

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
                    {this.renderDate()}
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

    renderDate() {
        let date = this.formatDate();
        return (
            <View style={styles.infoItem}>
                <AppText style={styles.main}>
                    {date[1]}
                </AppText>
                <AppText style={styles.secondary}>
                    {date[0]}
                </AppText>
            </View>
        );
    }

    formatDate() {
        return this.props.event.getDateToString().split("/");
    }

    renderGoing() {
        let { going } = this.state;
        return (
            <View style={styles.infoItem}>
                <CheckBox
                    onClick={this.pressGoing}
                    isChecked={going}
                />
                <AppText>{strings.participationLabel}</AppText>
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
        textAlign: 'center',
        fontSize: 18
    },

    secondary: {
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