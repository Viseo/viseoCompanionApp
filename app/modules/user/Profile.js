import React, {Component} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Avatar from '../../components/Avatar';
import AppText from '../global/AppText';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import {Navigation} from  'react-native-navigation';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        const avatar = this.renderAvatar();
        const firstName = this.renderFirstName();
        const lastName = this.renderLastName();
        const email = this.renderEmail();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
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
                firstName={this.props.firstName}
                lastName={this.props.lastName}
                style={{marginTop: 20}}
            />
        );
    }

    renderEmail() {
        return (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Email</AppText>
                <AppText style={styles.displayText}>{this.props.email}</AppText>
            </View>
        );
    }

    renderFirstName() {
        return (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Nom</AppText>
                <AppText style={styles.displayText}>{this.props.firstName}</AppText>
            </View>
        );
    }

    renderLastName() {
        return (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Prénom</AppText>
                <AppText style={styles.displayText}>{this.props.lastName}</AppText>
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'edit') {
            this._goToEditProfile();
        } else if(event.id === 'signOut') {
            this._signOut();
        }
    }

    _goToEditProfile() {
        this.props.navigator.push({
            screen: 'EditUserProfile',
            title: 'Modifier mon profil',
            navigatorStyle: defaultNavBarStyle,
        });
    }

    _signOut() {
        Navigation.showLightBox({
            screen: "authentication.signOut",
            style: {
                backgroundBlur: "dark",
                backgroundColor: "#135caa70"
            }
        });
    }
}

Profile.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/navigation/signOut.png'),
            id: 'signOut',
        },
        {
            icon: require('../../images/navigation/edit.png'),
            id: 'edit',
        },
    ],
};

Profile.navigatorStyle = defaultNavBarStyle;

const mapStateToProps = ({user}, ownProps) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(Profile);

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