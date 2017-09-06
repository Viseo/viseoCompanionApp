import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
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
        return (
            <ScrollView contentContainerStyle={styles.mainContainer} style={{backgroundColor: "white"}}>
                <View style={{flex:1,flexDirection:"row"}}>
                    <View  style={{flex:.3,marginTop:25,marginRight:20}}>
                    {avatar}
                    </View>
                    <View style={{flex:.7}}>
                        {firstName}
                        {lastName}
                        {email}
                    </View>
                </View>
            </ScrollView>
        );
    }

    renderAvatar() {
        const imageUrl = this.props.user.imageUrl;
        return (
            imageUrl ?
                <UserAvatar size="100" name="AvatarImage" src={imageUrl}/>
                :
                <TouchableOpacity>
                    <UserAvatar
                        size="100"
                        color={colors.avatarGray}
                        name={this.props.user.firstName.toUpperCase() + " " + this.props.user.lastName.toUpperCase() }
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
                <AppText style={styles.label}>Prénom</AppText>
                <AppText style={styles.displayText}>{this.props.user.firstName}</AppText>
            </View>
        );
    }

    renderLastName() {
        return (
            <View style={styles.textFieldContainer}>
                <AppText style={styles.label}>Nom</AppText>
                <AppText style={styles.displayText}>{this.props.user.lastName}</AppText>
            </View>
        );
    }
};

ProfileDetails.propTypes = {
    user: PropTypes.any.isRequired,
};

const {height, width} = Dimensions.get("window");
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
        fontWeight: "bold",
    },
    mainContainer: {
        marginHorizontal: 20,
    },
    textFieldContainer: {
        marginTop: 20,
    },
});

