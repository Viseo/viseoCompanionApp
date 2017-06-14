import React, {Component} from "react";
import AppText from "../../global/components/AppText";
import PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import colors from "../../global/colors";
import moment from "moment";

export default class ReceivedChatCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let dateTime = this.props.chatData.dateTime ?
            moment(this.props.chatData.dateTime).format("HH[h]mm") :
            moment().format("HH[h]mm");
        return (
            <View style={styles.mainContainer}>
                <AppText style={styles.textContainer}>{this.props.chatData.message}</AppText>
                <AppText style={styles.timeContainer}>{dateTime}</AppText>
                <View style={{flex: 1}}/>
            </View>
        );
    }
}

ReceivedChatCard.propTypes = {
    chatData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        flex: 7,
        textAlign: 'left',
        backgroundColor: colors.blue,
        padding: 6,
        margin: 3,
        borderRadius: 5,
        color: 'black',
    },
    timeContainer: {
        flex:1,
        fontSize: 10
    }
});