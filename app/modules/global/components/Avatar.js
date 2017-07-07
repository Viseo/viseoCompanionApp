import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from './AppText';
import PropTypes from 'prop-types';
import colors from '../colors';

export default class Avatar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const lastNameInitial = (this.props.lastName ? this.props.lastName[0] : '').toUpperCase();
        const firstNameInitial = (this.props.firstName ? this.props.firstName[0] : '').toUpperCase();
        const avatarSize = this._getSize();
        const appText =
            <AppText
                style={[
                    styles.avatar,
                    avatarSize,
                ]}
            >
                {firstNameInitial + lastNameInitial}
            </AppText>;
        const avatarCircle = this.props.otherProfileId ?
            <TouchableOpacity onPress={() => this._goToUserProfile()}>
                {appText}
            </TouchableOpacity>
            :
            appText;
        return (
            <View style={[{flex: 1, justifyContent: 'center'}, this.props.style]}>
                {avatarCircle}
            </View>
        );
    }

    _goToUserProfile() {
        this.props.navigator.push({
            screen: 'user.othersProfile',
            title: 'Profil détaillé',
            passProps: {
                otherProfileId: this.props.otherProfileId,
            },
        });
    }

    _getSize() {
        const {size} = this.props;
        return {
            height: deviceWidth / size,
            width: deviceWidth / size,
            borderRadius: deviceWidth / (size * 2),
            fontSize: size * 10,
        };

    }
}

Avatar.defaultProps = {
    size: 4,
};

Avatar.propTypes = {
    otherProfileId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

let {width: deviceWidth} = Dimensions.get('window');
const styles = StyleSheet.create({
    avatar: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: deviceWidth / 8,
        backgroundColor: 'lightgray',
        textAlign: 'center',
        color: 'white',
    },
});