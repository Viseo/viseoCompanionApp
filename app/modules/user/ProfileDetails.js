import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Avatar from "../../components/Avatar";
import AppText from "../global/components/AppText";
import {ScrollView, View} from "react-native";
import PropTypes from 'prop-types';

export default class ProfileDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const avatar = this.renderAvatar();
        const firstName = this.renderFirstName();
        const lastName = this.renderLastName();
        const email = this.renderEmail();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer} style={{backgroundColor: 'white'}}>
                {avatar}
                {firstName}
                {lastName}
                {email}
            </ScrollView>
        );
    }

    renderAvatar() {
        return (
            <Avatar
                firstName={this.props.user.firstName}
                lastName={this.props.user.lastName}
                style={{marginTop: 20}}
            />
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

ProfileDetails.propTypes= {
    user: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
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