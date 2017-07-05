import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

export default class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        return (
            <View>
                <Text>All the great stuff in one place!</Text>
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'profile') {
            this._goToUserProfile();
        }
    }

    _goToUserProfile() {
        this.props.navigator.push({
            screen: 'user.myProfile',
            title: 'Mon profil',
        });
    }
}

NewsFeed.propTypes = {
    navigator: PropTypes.object.isRequired,
};

NewsFeed.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/navigation/profile.png'),
            id: 'profile',
        },
    ],
};