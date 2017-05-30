import React, {Component} from 'react';
import AppText from "../../../components/appText";
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";

export default class SentChatCard extends Component {

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

SentChatCard.propTypes = {
    message: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        textAlign: 'right',
    },
});