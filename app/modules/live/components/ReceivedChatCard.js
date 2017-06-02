import React, {Component} from 'react';
import AppText from "../../global/AppText";
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";

export default class ReceivedChatCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <AppText style={styles.mainContainer}>{this.props.message}</AppText>
            </View>
        );
    }
}

ReceivedChatCard.propTypes = {
    message: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        textAlign: 'left',
    },
});