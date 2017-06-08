import React, {Component} from 'react';
import AppText from "../../global/AppText";
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";
import colors from "../../global/colors";


export default class ReceivedChatCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <AppText style={styles.textContainer}>{this.props.chatData.message}</AppText>
                <View style={{flex:10}}/>
            </View>
        );
    }
}

ReceivedChatCard.propTypes = {
    message: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        flex:9,
        textAlign: 'right',
        backgroundColor: colors.blue,
        padding: 6,
        margin:3,
        borderRadius: 5
    },
});