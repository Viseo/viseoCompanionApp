import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../global/components/AppText';
import PropTypes from 'prop-types';
import UserAvatar from 'react-native-user-avatar';
import colors from '../global/colors';

export default class ProfileDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const avatar = this.renderAvatar();
        const firstName = this.renderFirstName();
        const lastName = this.renderLastName();
        const email = this.renderEmail();
        const image = this._renderUserPicture();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer} style={{backgroundColor: 'white'}}>
                {avatar}
                {image}
                {firstName}
                {lastName}
                {email}
            </ScrollView>
        );
    }

    _renderUserPicture() {
        const imageUrl = this.props.user.imageUrl || 'https://s3-eu-west-1.amazonaws.com/viseo-companion/defaultEventImage.jpeg';
        return (
            <Image
                style={{height: 200, width: width}}
                source={{uri: imageUrl}}

            />
        );
    }

    renderAvatar() {
        return (
            <TouchableOpacity>
                <UserAvatar
                    size="100"
                    color={colors.avatarGray}
                    name={this.props.user.firstName + ' ' + this.props.user.lastName}
                    navigator={navigator}
                />
            </TouchableOpacity>
        );
    }

    renderEmail() {
        return (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Email</AppText>
                <AppText style={styles.displayText}>{this.props.user.email}</AppText>
            </View>
        );
    }

    renderFirstName() {
        return (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Nom</AppText>
                <AppText style={styles.displayText}>{this.props.user.firstName}</AppText>
            </View>
        );
    }

    renderLastName() {
        return (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Prénom</AppText>
                <AppText style={styles.displayText}>{this.props.user.lastName}</AppText>
            </View>
        );
    }
}

ProfileDetails.propTypes = {
    user: PropTypes.any.isRequired,
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    image: {
        width,
        height: height / 2,
    },
    displayText: {
        fontSize: 18,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mainContainer: {
        marginHorizontal: 20,
    },
    textFieldContainer: {
        marginTop: 20,
    },
});

