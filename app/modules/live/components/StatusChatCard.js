import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import AppText from '../../global/AppText';

export default class StatusChatCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <AppText style={styles.textContainer}>{this.props.chatData.message}</AppText>
            </View>
        );
    };
}

StatusChatCard.propTypes = {
    chatData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
    },
    textContainer: {
        textAlign: 'center',
    },
});