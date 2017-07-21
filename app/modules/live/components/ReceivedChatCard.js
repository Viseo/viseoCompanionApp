import React, {Component} from 'react';
import AppText from '../../global/components/AppText';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import colors from '../../global/colors';
import moment from 'moment';

export default class ReceivedChatCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let datetime = this.props.chatData.datetime ?
            moment(this.props.chatData.datetime, 'x').format('HH[h]mm') :
            moment().format('HH[h]mm');
        const fullName = this.props.chatData.writer.firstName + ' ' + this.props.chatData.writer.lastName;

        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 7, flexDirection: 'column'}}>
                    <AppText style={{textAlign: 'left'}}>
                        {fullName}
                    </AppText>
                    <AppText style={styles.textContainer}>
                        {this.props.chatData.message}</AppText>
                </View>
                <AppText style={styles.timeContainer}>{datetime}</AppText>
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
        flex: 1,
        fontSize: 10,
    },
});