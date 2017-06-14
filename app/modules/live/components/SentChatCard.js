import React, {Component} from 'react';
import AppText from "../../global/AppText";
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";
import colors from "../../global/colors";
import moment from "moment";

export default class SentChatCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let datetime = this.props.chatData.datetime ?
            moment(this.props.chatData.datetime).format("HH[h]mm") :
            null;
        return (
            <View style={styles.mainContainer}>
                <View style={{flex:1}}/>
                <AppText style={styles.timeContainer}>{datetime}</AppText>
                <AppText style={styles.textContainer}>{this.props.chatData.message}</AppText>
            </View>
        );
    }
}

SentChatCard.propTypes = {
    chatData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        flex:7,
        textAlign: 'right',
        backgroundColor: colors.green,
        padding: 6,
        margin:5,
        borderRadius: 5,
        color: 'black',
    },
    timeContainer: {
        flex:1,
        fontSize: 10
    }
});